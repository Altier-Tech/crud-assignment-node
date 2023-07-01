import tkinter as tk
import mysql.connector

# Connect to the MySQL database
mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="",
  database="cars"
)

# Create the carmodels table if it doesn't exist
mycursor = mydb.cursor()
mycursor.execute("CREATE TABLE IF NOT EXISTS carmodels (id INT AUTO_INCREMENT PRIMARY KEY, make VARCHAR(255), model VARCHAR(255), year INT)")

# Define the functions for the GUI
def view_records():
    mycursor.execute("SELECT * FROM carmodels")
    records = mycursor.fetchall()
    for record in records:
        print(record)

def add_record(make, model, year):
    sql = "INSERT INTO carmodels (make, model, year) VALUES (%s, %s, %s)"
    val = (make, model, year)
    print(val)
    mycursor.execute(sql, val)
    mydb.commit()
    print(mycursor.rowcount, "record inserted.")

def edit_record(id, make, model, year):
    sql = "UPDATE carmodels SET make = %s, model = %s, year = %s WHERE id = %s"
    val = (make, model, year, id)
    mycursor.execute(sql, val)
    mydb.commit()
    print(mycursor.rowcount, "record(s) affected.")

def delete_record(id):
    sql = "DELETE FROM carmodels WHERE id = %s"
    val = (id,)
    mycursor.execute(sql, val)
    mydb.commit()
    print(mycursor.rowcount, "record(s) deleted.")

# Create the GUI
root = tk.Tk()
root.title("Car Models")

# Add form
add_frame = tk.Frame(root)
add_frame.pack(side=tk.TOP)

make_label = tk.Label(add_frame, text="Make:")
make_label.pack(side=tk.LEFT)
make_entry = tk.Entry(add_frame)
make_entry.pack(side=tk.LEFT)

model_label = tk.Label(add_frame, text="Model:")
model_label.pack(side=tk.LEFT)
model_entry = tk.Entry(add_frame)
model_entry.pack(side=tk.LEFT)

year_label = tk.Label(add_frame, text="Year:")
year_label.pack(side=tk.LEFT)
year_entry = tk.Entry(add_frame)
year_entry.pack(side=tk.LEFT)

add_button = tk.Button(add_frame, text="Add", command=lambda: add_record(make_entry.get(), model_entry.get(), year_entry.get()))
add_button.pack(side=tk.LEFT)

# Table
table_frame = tk.Frame(root)
table_frame.pack(side=tk.TOP)

table = tk.Listbox(table_frame)
table.pack(side=tk.LEFT)

scrollbar = tk.Scrollbar(table_frame)
scrollbar.pack(side=tk.RIGHT, fill=tk.Y)

table.config(yscrollcommand=scrollbar.set)
scrollbar.config(command=table.yview)

# Populate table
mycursor.execute("SELECT * FROM carmodels")
records = mycursor.fetchall()
for record in records:
    # table.insert(tk.END, record)
    print(record)

# Edit form
edit_frame = tk.Frame(root)
edit_frame.pack(side=tk.TOP)

id_label = tk.Label(edit_frame, text="ID:")
id_label.pack(side=tk.LEFT)
id_entry = tk.Entry(edit_frame)
id_entry.pack(side=tk.LEFT)

make_label = tk.Label(edit_frame, text="Make:")
make_label.pack(side=tk.LEFT)
make_entry = tk.Entry(edit_frame)
make_entry.pack(side=tk.LEFT)

model_label = tk.Label(edit_frame, text="Model:")
model_label.pack(side=tk.LEFT)
model_entry = tk.Entry(edit_frame)
model_entry.pack(side=tk.LEFT)

year_label = tk.Label(edit_frame, text="Year:")
year_label.pack(side=tk.LEFT)
year_entry = tk.Entry(edit_frame)
year_entry.pack(side=tk.LEFT)

edit_button = tk.Button(edit_frame, text="Edit", command=lambda: edit_record(id_entry.get(), make_entry.get(), model_entry.get(), year_entry.get()))
edit_button.pack(side=tk.LEFT)

# Delete form
delete_frame = tk.Frame(root)
delete_frame.pack(side=tk.TOP)

id_label = tk.Label(delete_frame, text="ID:")
id_label.pack(side=tk.LEFT)
id_entry = tk.Entry(delete_frame)
id_entry.pack(side=tk.LEFT)

delete_button = tk.Button(delete_frame, text="Delete", command=lambda: delete_record(id_entry.get()))
delete_button.pack(side=tk.LEFT)

root.mainloop()