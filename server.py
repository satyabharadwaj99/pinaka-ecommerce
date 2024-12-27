from http.server import HTTPServer, SimpleHTTPRequestHandler
import webbrowser
import os

# Change to the directory containing your HTML files
os.chdir(os.path.dirname(os.path.abspath(__file__)))

# Set up the server
PORT = 8000
Handler = SimpleHTTPRequestHandler
httpd = HTTPServer(("", PORT), Handler)

print(f"Server running at http://localhost:{PORT}")
print("Opening website in your default browser...")

# Open the website in the default browser
webbrowser.open(f'http://localhost:{PORT}/index.html')
webbrowser.open(f'http://localhost:{PORT}/admin.html')

# Keep the server running
httpd.serve_forever()
