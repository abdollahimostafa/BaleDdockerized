import requests
from datetime import datetime, timedelta
from flask import Flask, request, jsonify
from functools import lru_cache
import time
app = Flask(__name__)

# Configurations 
BALE_CLIENT_ID = "BeJOhjiKOtPkVDcdvIZWmbljOxQRtBSJ"
BALE_CLIENT_SECRET = "ygMQZweJJMtNQKWOvUNCdfilLnbOWxwO"


# Bale API endpoints
AUTH_URL = "https://safir.bale.ai/api/v2/auth/token"
SEND_OTP_URL = "https://safir.bale.ai/api/v2/send_otp"

# Token cache /  automatic refresh
@lru_cache(maxsize=1)
def get_bale_token():
    """Get valid Bale access token with automatic refresh"""
    payload = {
        "grant_type": "client_credentials",
        "client_id": BALE_CLIENT_ID,
        "client_secret": BALE_CLIENT_SECRET,
        "scope": "read"
    }
    
    response = requests.post(
        AUTH_URL,
        data=payload,
        headers={"Content-Type": "application/x-www-form-urlencoded"}
    )
    response.raise_for_status()
    
    token_data = response.json()
    return {
        "access_token": token_data["access_token"],
        "expires_at": datetime.now() + timedelta(seconds=token_data["expires_in"])
    }

@app.route("/otpbale", methods=["POST"])
def otpbale():
    """Send OTP to Bale API (only OTP functionality)"""
    data = request.json

    # Validate required fields
    if not data or "phone" not in data or "otp" not in data:
        return jsonify({"error": "Missing required fields: phone, otp"}), 400
    
    phone = data["phone"]
    otp = data["otp"]
    # Validating phone format 
    if not (isinstance(phone, str) and 
            phone.startswith("98") and 
            len(phone) == 12 and 
            phone[2:].isdigit()):
        return jsonify({
            "error": "Invalid phone format. Must be 12 digits starting with 98 (e.g., 989123456789)"
        }), 400
    
    # Validate OTP (3-8 digits)
    if not (isinstance(otp, str) and 
            otp.isdigit() and 
            3 <= len(otp) <= 8):
        return jsonify({
            "error": "Invalid OTP. Must be 3-8 digits (e.g., 123456)"
        }), 400
    try:
        # Get valid token (auto-refreshes if expired)
        token_data = get_bale_token()
        # Send OTP to Bale
        print(token_data['access_token'])
        response = requests.post(
            SEND_OTP_URL,
            json={"phone": str(phone), "otp": int(otp)},
            headers={
                "Authorization": f"Bearer {token_data['access_token']}",
                "Content-Type": "application/json"
            }
        )


        # Bale API returns 200 on success 
        if response.status_code == 200:
            return jsonify({"status": "OK"}), 200
        else:
            return jsonify({
                "status": "NOK",
                "error": f"Bale API error ({response.status_code})"
            }), response.status_code
    
    except requests.exceptions.RequestException as e:
        return jsonify({
            "status": "NOK",
            "error": "Bale service unavailable"
        }), 503
    except Exception as e:
        return jsonify({
            "status": "NOK",
            "error": "Internal server error"
        }), 500



if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, threaded=True)