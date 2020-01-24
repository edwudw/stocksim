from flask import Flask, current_app
from flask_login import LoginManager
from . import config

login_manager = LoginManager()
app = Flask(__name__)
app.config["SECRET_KEY"] = config.secret_key

login_manager.init_app(app)
login_manager.login_view = '/'

from app import routes