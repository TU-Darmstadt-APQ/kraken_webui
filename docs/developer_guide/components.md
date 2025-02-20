# 🎨 UI Components

This document provides an overview of the UI components used in **Kraken Web UI**.

---

## 🏛️ Component Structure

All UI components are organized into two main categories:

```
src/components/
│── mongodb/                   # Components to interact with the database (mongodb)
│
│── UI/                        # Default reusable UI components (buttons, inputs, etc.)
│   │── button/                # Custom button components
│   │── input/                 # Input fields
│   │── header/                # Header
│   │── ModalWindow/           # Modal dialog windows
│   │── select/                # Dropdown select components
│   │── toggle/                # Toggle switches
│   │── tooltip/               # Custom tooltip
│   ├── ConfigEditorModal.tsx  # Modal window for editing configuration of sensors
│   └── InputRow.tsx           # Form row for structured input into the table
│
│   # Administrative components
│
├── MyContent.tsx    # Main content wrapper that renders and manages sensor-related UI components.
├── PostFilter.tsx   # UI component for filtering posts based on various criteria.
├── PostForm.tsx     # Form for creating and editing sensor data.
├── PostHandler.tsx  # Manages sensor-related operations (CRUD) and handles data processing.
├── PostList.tsx     # Displays a list of sensors with filtering, sorting, and dynamic column toggles.
└── TableItem.tsx    # Represents a single row in the sensor table with edit and delete actions.
```

Each component is **modular, reusable, and categorized** for maintainability.

---

## 🔹 Default UI Components (`UI/`)

These components are **small, reusable elements** used throughout the application.  
They **do not contain business logic** and focus purely on UI styling and functionality.

| Component                                         | Description                                                                                                                                                                                  |
| ------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Buttons** (`button/`)                           | Custom button components, including different styles and variants.                                                                                                                           |
| **Inputs** (`input/`)                             | Standard input fields for text, numbers, and other user input types.                                                                                                                         |
| **Header** (`header/`)                            | The main header component for the application layout.                                                                                                                                        |
| **Modals** (`ModalWindow/`)                       | A flexible popup dialog that can contain any component or group of components. It displays them as a modal overlay at a higher level and dynamically adjusts its size based on its children. |
| **Selects** (`select/`)                           | Dropdown menus for choosing predefined options.                                                                                                                                              |
| **Toggles** (`toggle/`)                           | Switch components to enable/disable settings.                                                                                                                                                |
| **Tooltips** (`tooltip/`)                         | Custom tooltips to provide additional context to UI elements.                                                                                                                                |
| **Config Editor Modal** (`ConfigEditorModal.tsx`) | Form for editing sensor configurations.                                                                                                                                                      |
| **Input Row** (`InputRow.tsx`)                    | A structured input row component for table-based data entry.                                                                                                                                 |

✅ **Example: Reusable Button Component**

```tsx
<MyButton className="list-button" onClick={() => edit(post)}>
  <img src="/edit.png" alt="Edit" width={20} height={20} />
</MyButton>
```

---

## 🔥 Complex Components (Administrative Components)

These components **manage complex business logic** and often interact with other components.  
They are **not generic** and are used for **specific application features**.

| Component       | Purpose                                                                                        |
| --------------- | ---------------------------------------------------------------------------------------------- |
| **MyContent**   | Main content wrapper that renders and manages sensor-related UI components dynamically.        |
| **PostFilter**  | Provides filtering options for posts, allowing users to narrow down results based on criteria. |
| **PostForm**    | Handles creating and editing sensor data, including form validation and user input handling.   |
| **PostHandler** | Manages sensor-related operations (CRUD) and processes data before sending it to the backend.  |
| **PostList**    | Displays a list of sensors with features like filtering, sorting, and dynamic column toggles.  |
| **TableItem**   | Represents a single row in the sensor table, handling inline editing and delete actions.       |

✅ **Example: Handling Posts**

```tsx
let sensors: tinkerforgeDTO[] = await getAllDocuments();

<PostHandler sensors={sensors} />;
```

---

## 🛢️ MongoDB Components (`mongodb/`)

These components are responsible for **database operations** and data retrieval.

| Component       | Purpose                                                                         |
| --------------- | ------------------------------------------------------------------------------- |
| **DBConnector** | Manages MongoDB database connection, queries sensor data, and handles deletion. |

---

## 📌 Best Practices

- **Keep UI components reusable** – avoid mixing them with business logic.
- **Separate concerns** – UI elements go into `UI/`, complex logic into separate files.
- **Use props** to pass data instead of relying on hardcoded values.

---

## ✅ Summary

- **Two main categories of components:**
  - **Default UI Components** (`UI/`) → reusable elements like buttons, inputs, modals.
  - **Complex Components** (`PostHandler`, `PostList`, etc.) → components with business logic.
- The structure ensures **modularity and maintainability**.
- **Follow best practices** for clear and structured component organization.
