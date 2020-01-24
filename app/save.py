from .user import User
import psycopg2

def isUserInDb(user_id):
    conn = psycopg2.connect("dbname='stocksim'")
    cur = conn.cursor()
    cur.execute("SELECT * FROM users WHERE email=%(user_id)s", 
    {
        'user_id': user_id
    })
    result = cur.fetchall()
    if (len(result) > 0):
        return True
    return False

def save_user(user):
    if isinstance(user, User) and isUserInDb(user.get_id()) == False:
        conn = psycopg2.connect("dbname='stocksim'")
        cur = conn.cursor()
        cur.execute("INSERT INTO users VALUES (DEFAULT, %(user_id)s, %(password_hash)s)",
        {
            'user_id': user.get_id(),
            'password_hash': user.get_password_hash()
        })
        conn.commit()
        cur.close()
        conn.close()
        return True
    return False

def get_user(user_id):
    conn = psycopg2.connect("dbname='stocksim'")
    cur = conn.cursor()
    cur.execute("SELECT * FROM users WHERE email='" + user_id + "'")
    result = cur.fetchall()
    user = None
    if (len(result) > 0):
        user = User(result[0][1], None, result[0][2])
        
    cur.close()
    conn.close()
    return user
        
