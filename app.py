from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def login():
    error = None
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        email = request.form['email']

        # Match exact credentials (case-sensitive)
        if username == 'Admin1' and password == 'Admin1' and email == 'Admin@1.com':
            return redirect(url_for('dashboard'))
        else:
            error = 'Invalid login. Please try again.'

    return render_template('Login.html', error=error)

@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html')

if __name__ == '__main__':
    app.run(debug=True)
