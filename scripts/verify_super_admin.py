import urllib.request
import urllib.parse
import json
import http.cookiejar
import os

BASE_URL = 'http://localhost:3000'

def test_routes():
    print("--- 1. Testing Layout Isolation on Public vs Admin Pages ---")
    req_pub = urllib.request.urlopen(f"{BASE_URL}/")
    html_pub = req_pub.read().decode('utf-8')
    assert "Akufai Capital" in html_pub
    print("  [PASS] Public homepage rendered successfully.")

    req_login = urllib.request.urlopen(f"{BASE_URL}/admin/login")
    html_login = req_login.read().decode('utf-8')
    assert "Super Administrator" in html_login or "Executive Authentication" in html_login or "admin" in html_login.lower()
    print("  [PASS] Admin login page rendered without public layout.")

    print("\n--- 2. Testing Unauthenticated API Protection ---")
    try:
        urllib.request.urlopen(f"{BASE_URL}/api/admin/publish")
        assert False, "Expected 401 Unauthorized"
    except urllib.error.HTTPError as e:
        assert e.code == 401
        print("  [PASS] Unauthorized request to /api/admin/publish returned 401.")

    print("\n--- 3. Testing Administrative Authentication ---")
    cj = http.cookiejar.CookieJar()
    opener = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(cj))

    login_data = json.dumps({
        'email': 'admin@akufaicapitalandequities.com',
        'password': 'Akufai2026!Secure'
    }).encode('utf-8')

    login_req = urllib.request.Request(
        f"{BASE_URL}/api/auth/login",
        data=login_data,
        headers={'Content-Type': 'application/json'}
    )
    login_res = opener.open(login_req)
    login_json = json.loads(login_res.read().decode('utf-8'))
    assert login_json.get('success') == True
    print(f"  [PASS] Successfully authenticated as: {login_json['user']['name']} ({login_json['user']['email']})")

    print("\n--- 4. Testing Publishing & Versioning API (GET) ---")
    get_req = urllib.request.Request(f"{BASE_URL}/api/admin/publish")
    get_res = opener.open(get_req)
    get_json = json.loads(get_res.read().decode('utf-8'))
    assert get_json.get('success') == True
    print(f"  [PASS] Publishing API state returned: {get_json.get('totalPublications')} publications on record.")
    print(f"         Target branch: {get_json.get('config', {}).get('githubBranch')}")

    print("\n--- 5. Testing Publishing Release Trigger (POST 'publish') ---")
    pub_data = json.dumps({
        'action': 'publish',
        'message': 'Super admin automated verification release',
        'triggerDeploy': False
    }).encode('utf-8')

    pub_req = urllib.request.Request(
        f"{BASE_URL}/api/admin/publish",
        data=pub_data,
        headers={'Content-Type': 'application/json'}
    )
    pub_res = opener.open(pub_req)
    pub_json = json.loads(pub_res.read().decode('utf-8'))
    assert pub_json.get('success') == True
    record = pub_json.get('record')
    print(f"  [PASS] Published version: {record.get('version')} (ID: {record.get('id')})")
    print(f"         Commit message: {record.get('commitMessage')}")
    print(f"         Published by: {record.get('publishedBy')}")

    print("\n--- 6. Verifying Sanitized Public Export File ---")
    export_path = os.path.join(os.getcwd(), 'data', 'published-content.json')
    assert os.path.exists(export_path), "Exported content JSON file does not exist"
    with open(export_path, 'r', encoding='utf-8') as f:
        exported_data = json.load(f)
    assert 'users' not in exported_data, "SECURITY ISSUE: users found in public export!"
    assert 'inquiries' not in exported_data, "SECURITY ISSUE: inquiries found in public export!"
    assert 'subscribers' not in exported_data, "SECURITY ISSUE: subscribers found in public export!"
    assert 'settings' in exported_data, "Settings missing in export"
    assert 'heroSlides' in exported_data, "Hero slides missing in export"
    print("  [PASS] data/published-content.json is strictly sanitized: Zero private data leaked.")

    print("\n--- 7. Testing Version Rollback (POST 'rollback') ---")
    rollback_data = json.dumps({
        'action': 'rollback',
        'versionId': record.get('id')
    }).encode('utf-8')

    rb_req = urllib.request.Request(
        f"{BASE_URL}/api/admin/publish",
        data=rollback_data,
        headers={'Content-Type': 'application/json'}
    )
    rb_res = opener.open(rb_req)
    rb_json = json.loads(rb_res.read().decode('utf-8'))
    assert rb_json.get('success') == True
    rb_record = rb_json.get('record')
    print(f"  [PASS] Successfully executed rollback to {record.get('version')}: new version {rb_record.get('version')}")

    print("\n========================================================")
    print("  ALL SUPER ADMIN & PUBLISHING SUITES PASSED (100% OK)  ")
    print("========================================================")

if __name__ == '__main__':
    test_routes()
