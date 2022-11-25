from flask import Flask, jsonify, request
from marshmallow import Schema, fields, ValidationError
from dotenv import load_dotenv
import os


class UserSchema(Schema):
    name = fields.Str()
    age = fields.Int()
    company = fields.Str()

load_dotenv()
port = os.getenv('PORT') if  os.getenv('PORT') else 5000
db = {}
app = Flask(__name__,)



@app.get("/")
def getDbKeys():
    return jsonify(list(db.keys())),200

@app.get("/<uid>")
def getUser(uid):
    if(not uid.lower() in db.keys()):
        return "User not found",404
    
    user = db.get(uid.lower())
    return jsonify(user),200

@app.post("/")
def addUser():
    request_data = request.json
    schema = UserSchema()
    try:
        # Validate request body against schema data types
        
        result = schema.load(request_data)
    except ValidationError as err:
        # Return a nice message if validation fails
        return jsonify(err.messages), 400

    #Since we validated the body, we know that result["name"] is a string at all times
    db[result["name"].lower()] = result

    return "Success",201


@app.put("/<uid>")
def updateUser(uid):
    status = 200
    if (not uid.lower() in db.keys()):
        status = 201
    
    # We can perform same operation as in the POST request
    # We have to check the return code though
    message,code = addUser()
    status = code if code == 400 else status

    return message,status

@app.delete("/<uid>")
def deleteUser(uid):
    if(not uid.lower() in db.keys()):
        return "User not found",404
    db.pop(uid.lower())
    return "Success", 200
    
    


if __name__ == "__main__":
  app.run(host="localhost",port=port)