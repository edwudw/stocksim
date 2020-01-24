
def verify_user_credentials(user_id, password):
    if (len(user_id) == 0 or len(password) < 6):
        return False
    return True