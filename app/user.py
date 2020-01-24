from werkzeug.security import generate_password_hash, check_password_hash

class User:
    def __init__(self, username, password=None, password_hash=None):
        self._username = username
        self._password = password
        if password != None:
            self.password_hash = generate_password_hash(password)
        else:
            self.password_hash = password_hash
        self.is_authenticated = False
        self.is_active = True 
        self.is_anonymous = False

    def setAuthenticated(self, authenticated):
        self.is_authenticated = authenticated

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def get_password_hash(self):
        return self.password_hash

    def get_id(self):
        return self._username