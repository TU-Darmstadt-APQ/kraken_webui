# 🛠️ Usage Instructions

This guide provides step-by-step instructions on how to use **Kraken Web UI**.

---

## 🔎 **Searching for Sensors**

1. Locate the **search field** in the top-right corner of the interface. It is a white input box with placeholder text **"Search for..."**.
2. Click inside the search field and type the name, ID, or another property of the sensor you are looking for.
3. The list of sensors will be **filtered automatically** to match your search input.
4. If no matching sensors are found, the list will appear empty.
5. To reset the search and view all sensors again, **clear the input field** by deleting the text inside.

📌 **Note:** The search applies to all sensors and works in combination with sorting.

## 🎯 **Searching by Specific Field**

1. Locate the **"Search by" dropdown menu** next to the search bar in the top-right corner.
2. Click the dropdown menu to see a list of **available search fields** (e.g., Name, ID, Type).
3. Select a field to **narrow down the search criteria**.
4. Type your search term in the search field. Now, the search will only match results within the selected field.
5. To reset, select **"All"** in the dropdown to search across all fields again.

📌 **Example:**

- If you select **"Type"** and enter `"temperature"`, it will only show temperature sensors.
- If you select **"ID"**, the search will only check sensor IDs.

---

## 🔄 **Sorting the Sensor List**

1. Locate the **"Sort by" dropdown menu** in the top-right corner, next to the search bar.
2. Click on the dropdown to see a **list of available sorting options** (e.g., Name, Date Added, Sensor Type).
3. Click on one of the options to **sort the list accordingly**.
4. The list of sensors will be updated instantly and arranged in the selected order.
5. Sorting works together with the search feature. If you search for sensors and then apply sorting, only the filtered results will be sorted.

📌 **Note:** Sorting is always active, even when filtering the list by search.

---

## ➕ **Adding a New Sensor**

1. In the top-right corner of the interface, find the **"+" button** (Add Sensor).
2. Click the **"+" button**, and a **new empty row** will appear at the top of the table.
3. Click inside each field of the new row and enter the required sensor details:
   - **Name** → Give the sensor a unique name.
   - **Type** → Select the sensor type.
   - **Other Fields** → Fill in any additional information required.
4. To save the sensor, click the **save button (💾)** in the "Actions" column of the new row.
5. If you want to **cancel adding the sensor**, click the **"❌" button** to remove the row without saving.

📌 **Note:**

- The sensor will be added to the database only after clicking the **save button**.
- Above the table you can see the **toggles** that are responsible for which columns in the table will be displayed. If you do not see the parameter you need in the table, make sure that it **is not hidden** (it is hidden if the toggle of this parameter is not checked).

---

## ✏️ **Editing Sensor Information**

1. Find the sensor you want to edit in the table.
2. In the **"Actions"** column of the corresponding row, click the **edit button (📝 pencil icon)**.
3. The row will become **editable**, allowing you to modify the sensor details.
4. Make the necessary changes to the fields.
5. Click the **save button (💾)** in the same row to apply the changes.

📌 **Note:**

- The changes will not be saved unless you click the **save button**.
- Above the table you can see the **toggles** that are responsible for which columns in the table will be displayed. If you do not see the parameter you need in the table, make sure that it **is not hidden** (it is hidden if the toggle of this parameter is not checked).

---

## 🗑️ **Deleting a Sensor**

1. Find the sensor you want to delete in the table.
2. In the **"Actions"** column of the corresponding row, click the **delete button (❌)**.
3. A confirmation dialog may appear asking if you are sure you want to delete the sensor.
4. Confirm the deletion. The sensor will be permanently removed from the list.

📌 **Note:** This action cannot be undone. Once deleted, the sensor must be added again manually if needed.

---

## ⚙️ Editing or Adding Sensor Configuration

This guide explains how to **modify an existing configuration or add a new one** for a sensor.

### 🔧 **Opening the Configuration Editor**

1. In the sensor list, locate the **"Config"** column.
2. If a configuration exists, it will be displayed in this column. Otherwise, you will see **"No configuration given"**.
3. Click the **"Edit Config"** button to open the configuration editor.

### 🖥️ **Using the Configuration Editor**

1. When you click **"Edit Config"**, a **popup window** will appear.
2. ⚠️ **Warning:** If you click outside the popup, it will automatically close, and **any unsaved changes will be lost**.

### 🔄 **Selecting a Sensor Type**

1. Locate the **"Sensor Type"** dropdown at the top of the popup.
2. Select a **specific sensor type**:
   - If you choose a type, the system will **automatically provide predefined configuration fields**.
   - If you do **not** select a type, you will need to **manually enter all fields** for the configuration.

### ➕ **Adding Configuration Fields**

1. Below **"Edit configuration"**, you will see two input fields labeled **"Key"** and **"Value"**.
2. Enter a **configuration key** (e.g., `threshold`, `update_interval`).
3. Enter the **corresponding value** (e.g., `30`, `true`).
4. Click the **"Add" button** to insert the configuration entry into the list.
5. The new field will appear below with an option to **remove it**.

### 🗑️ **Removing Configuration Fields**

- If you want to delete a field from the configuration, click the **"Delete" button** next to that field.
- The field will be **immediately removed** from the list.

### 💾 **Saving or Canceling Changes**

1. Once all required fields are added, click the **"Save Changes" button** to confirm the configuration.
2. If you do **not** want to save your changes, simply **click outside the popup** to close it.
3. ⚠️ **Warning:** Clicking outside the popup will **discard all progress**, so be careful when making edits.

---

💡 **More User Stories Coming Soon!**
If you encounter any issues, check the **[Troubleshooting Guide](troubleshooting.md)**.
