import urllib.request
import json
import base64


REPO_OWNER = 'gunjanjain-pixel'
REPO_NAME = 'InstaDaily'
FILE_PATH = 'InstaDaily-User-Guide.md'
COMMIT_MESSAGE = 'Add InstaDaily user guide'

guide_content = """# InstaDaily Guide
## How to Use
A quick-commerce app where a cart can be shared across devices, and the app works out who owes what.

### Step 1 Log in with your phone number
Download InstaDaily and open it. Tap Login, enter your 10-digit number, and verify the OTP. First-time users set a display name here.

### Step 2 Set your delivery address
Allow location access or search your area, then drop the pin on your building and add flat number, floor and a landmark. Save it as Home.

### Step 3 Choose solo or shared cart
On the home screen you get two options: Shop Alone or Start a Shared Cart.

### Step 4 Invite people to the cart
Once the cart exists, tap Invite. Share the link on WhatsApp or add people from your contacts. They open it, log in on their own phone, and they're in.

### Step 5 Add items
Search or browse, tap ADD, adjust quantity. Every item carries a small tag showing who added it. For anything the group is sharing, mark it as Shared.

### Step 6 Check the split
Open the Split tab in the cart. Instead of one total, you see a per-person breakdown.

### Step 7 Lock the cart and pay
Whoever starts checkout locks the cart, so nobody adds a packet of chips mid-payment.
Two ways to pay:
* One person pays the full amount, and the app records what each of the others owes them.
* Everyone pays their own share, and the order goes through once all shares are in.

### Step 8 Track, receive, settle up
Everyone in the cart gets the live tracking screen rider name, number, map. When the order arrives, check the items against the list."""


encoded_content = base64.b64encode(guide_content.encode('utf-8')).decode('utf-8')


url = f"https://api.github.com/repos/{REPO_OWNER}/{REPO_NAME}/contents/{FILE_PATH}"
headers = {
    "Authorization": f"Bearer {GITHUB_TOKEN}",
    "Accept": "application/vnd.github.v3+json",
    "User-Agent": "Python-urllib"
}


sha = None
try:
    req_check = urllib.request.Request(url, headers=headers, method='GET')
    with urllib.request.urlopen(req_check) as response:
        if response.status == 200:
            resp_data = json.loads(response.read().decode('utf-8'))
            sha = resp_data.get('sha')
except urllib.error.HTTPError as e:
    if e.code != 404:  # 404 just means file doesn't exist yet, which is fine
        print(f"Error checking file status: {e.code}")


data = {
    "message": COMMIT_MESSAGE,
    "content": encoded_content
}
if sha:
    data["sha"] = sha

json_data = json.dumps(data).encode('utf-8')

try:
    req_put = urllib.request.Request(url, data=json_data, headers=headers, method='PUT')
    with urllib.request.urlopen(req_put) as response:
        if response.status in [200, 201]:
            print(f"Success! '{FILE_PATH}' is now live on GitHub with a readable preview.")
except urllib.error.HTTPError as e:
    print(f"HTTP Error {e.code}:")
    print(e.read().decode('utf-8'))
except Exception as e:
    print(f"Error: {e}")
