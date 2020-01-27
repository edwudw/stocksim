from app import app, login_manager
from .user import User
from .validation import verify_user_credentials
from . import save
from flask import Flask, render_template, request, redirect, url_for, abort
from flask_login import current_user, login_user, login_required, logout_user
from werkzeug.security import generate_password_hash
import json

@login_manager.user_loader
def load_user(user_id):
    user = save.get_user(user_id)
    if user == None:
        return None
    user.is_authenticated = True
    return user

@app.route("/", methods=["GET", "POST"])
def index():
    if current_user.is_authenticated:
        return redirect(url_for('home'))
    if request.method == "POST":
        user = save.get_user(request.form['email'])
        if user.check_password(request.form['password']):
            login_user(user)
            return redirect(url_for('home'))
        print('error')
        return render_template('index.html', error=True)
    return render_template('index.html', error=False)

@app.route("/signup", methods=["GET", "POST"])
def signup():
    if current_user.is_authenticated:
        return redirect(url_for('home'))
    if request.method == 'POST':
        print(request.json['email'])
        if verify_user_credentials(request.json['email'], request.json['password'])\
             == False:

            return json.dumps({
                'success': False,
                'error': 'Email/password is empty'
            })
        user = User(request.json['email'], request.json['password'])
        if save.save_user(user):
            print('Sign up by ' + request.json['email'])
            login_user(user)
            return json.dumps({
                'success': True,
                'redirectUrl': url_for('home')
            }, separators=(',', ':'))
        else:
            return json.dumps({
                'success': False,
                'error': 'User already exists'
            })
    return render_template('signup.html')

@app.route('/logout', methods=['GET'])
@login_required
def logout():
    logout_user()
    return redirect(url_for('index'))
    
@app.route('/home', methods=['GET'])
@login_required
def home():
    return render_template('home.html', email=current_user.get_id())

@app.route('/transfer', methods=['GET'])
@login_required
def transfer():
    return render_template('transfer.html', email=current_user.get_id())