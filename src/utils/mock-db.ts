
export const chatMessages = [
    {
      user: "1",
      prompt: "I want to generate a Schema for a todo app",
      chatId: "1",
      message: `Great! Let's start designing your NoSQL schema. First, should users be able to:
  1. Create multiple todo lists?
  2. Assign due dates to tasks?
  3. Categorize todos with tags?
  Please answer with which features you want to include.`,
    },
    {
      user: "1",
      prompt: "I need due dates and tags for tasks",
      chatId: "1",
      message: `Good choices. Next:
  1. Should todos have priority levels (e.g., low/medium/high)?
  2. Do you need task completion history tracking?
  3. Should users be able to share todos with others?`,
    },
    {
      user: "1",
      prompt: "Just priority levels and completion tracking",
      chatId: "1",
      message: `Almost done! Last questions:
  1. Should todos allow file attachments?
  2. Need reminders/notifications?
  3. Should priorities be numeric (1-5) or labels?`,
    },
    {
      user: "1", 
      prompt: "No attachments, numeric priorities 1-3",
      chatId: "1",
      message: `Here's your schema:
  {
    "schema": {
      "users": {
        "fields": {
          "_id": "ObjectId",
          "email": "string",
          "passwordHash": "string",
          "createdAt": "Date"
        }
      },
      "todos": {
        "fields": {
          "_id": "ObjectId",
          "userId": "ObjectId(ref: users)",
          "title": "string",
          "description": "string",
          "priority": "number(1-3)",
          "tags": "string[]",
          "dueDate": "Date",
          "completed": "boolean",
          "completedAt": "Date?",
          "createdAt": "Date"
        }
      }
    },
    "indexes": [
      {"name": "user_todos", "fields": ["userId", "createdAt"]},
      {"name": "due_date_index", "fields": ["dueDate"]}
    ]
  }`
    }
  ];

  export const conversation1 = [
    {
      user: "2",
      prompt: "I want to generate a schema for a note-taking app",
      chatId: "2",
      message: `Nice! Let's design your schema for a note-taking app. First, should users be able to:
  1. Organize notes into folders?
  2. Tag notes with keywords?
  3. Share notes with other users?
  Let me know which of these you'd like to include.`,
    },
    {
      user: "2",
      prompt: "Folders and tags only",
      chatId: "2",
      message: `Great! Next:
  1. Should notes support rich text formatting?
  2. Do you want to allow archiving/deleting notes?
  3. Should notes be timestamped with last modified date?`,
    },
    {
      user: "2",
      prompt: "Yes to rich text and timestamps, but no delete/archive",
      chatId: "2",
      message: `Got it. Last set of questions:
  1. Should folders be user-specific?
  2. Do tags need descriptions or just plain strings?
  3. Should we track note creation date as well?`,
    },
    {
      user: "2",
      prompt: "Yes to all three",
      chatId: "2",
      message: `Here's your schema:
  
  {
    "schema": {
      "users": {
        "fields": {
          "_id": "ObjectId",
          "email": "string",
          "passwordHash": "string",
          "createdAt": "Date"
        }
      },
      "folders": {
        "fields": {
          "_id": "ObjectId",
          "userId": "ObjectId(ref: users)",
          "name": "string",
          "createdAt": "Date"
        }
      },
      "tags": {
        "fields": {
          "_id": "ObjectId",
          "name": "string",
          "description": "string?"
        }
      },
      "notes": {
        "fields": {
          "_id": "ObjectId",
          "userId": "ObjectId(ref: users)",
          "folderId": "ObjectId(ref: folders)?",
          "title": "string",
          "content": "string(rich text)",
          "tags": "ObjectId[](ref: tags)",
          "createdAt": "Date",
          "lastModifiedAt": "Date"
        }
      }
    },
    "indexes": [
      {"name": "user_notes", "fields": ["userId", "lastModifiedAt"]},
      {"name": "folder_notes", "fields": ["folderId"]},
      {"name": "tag_lookup", "fields": ["tags"]}
    ]
  }`
    }
  ];
  

  export const conversation2 = [
    {
      user: "3",
      prompt: "I'd like to create a schema for a habit tracker app",
      chatId: "3",
      message: `Awesome! Let’s get started on your habit tracker schema. First:
  1. Should users be able to track multiple habits?
  2. Do habits repeat daily, weekly, or custom schedules?
  3. Should we track progress (e.g., streaks or check-ins)?
  Let me know which features you need.`,
    },
    {
      user: "3",
      prompt: "Yes to all of them",
      chatId: "3",
      message: `Great choices! Next:
  1. Should habits include reminders?
  2. Do you want to categorize habits (e.g., Health, Productivity)?
  3. Should we store notes per habit check-in?`,
    },
    {
      user: "3",
      prompt: "Yes to reminders and categories, but no notes",
      chatId: "3",
      message: `Nice! Final questions:
  1. Should users be able to mark habits as archived?
  2. Do you want to log missed check-ins?
  3. Should habits have a start date and optional end date?`,
    },
    {
      user: "3",
      prompt: "Yes to all three",
      chatId: "3",
      message: `Here's your schema:
  
  {
    "schema": {
      "users": {
        "fields": {
          "_id": "ObjectId",
          "email": "string",
          "passwordHash": "string",
          "createdAt": "Date"
        }
      },
      "habits": {
        "fields": {
          "_id": "ObjectId",
          "userId": "ObjectId(ref: users)",
          "name": "string",
          "category": "string",
          "schedule": "string(custom: daily|weekly|custom)",
          "reminderTime": "string(time)?",
          "startDate": "Date",
          "endDate": "Date?",
          "archived": "boolean",
          "createdAt": "Date"
        }
      },
      "habitCheckIns": {
        "fields": {
          "_id": "ObjectId",
          "habitId": "ObjectId(ref: habits)",
          "date": "Date",
          "completed": "boolean",
          "missed": "boolean",
          "createdAt": "Date"
        }
      }
    },
    "indexes": [
      {"name": "user_habits", "fields": ["userId", "category"]},
      {"name": "habit_checkins", "fields": ["habitId", "date"]}
    ]
  }`
    }
  ];
  

  export const conversatio3 = [
    {
      user: "4",
      prompt: "I want to build a personal finance tracking app. Can you help with the schema?",
      chatId: "4",
      message: `Absolutely! Let's start by figuring out what features you want:
  1. Should users be able to track both income and expenses?
  2. Do you want support for custom spending categories?
  3. Should the app support recurring transactions (e.g., rent, salary)?
  Let me know which ones you want.`,
    },
    {
      user: "4",
      prompt: "Yes to all three",
      chatId: "4",
      message: `Got it! Next:
  1. Do you want budget tracking per category?
  2. Should transactions support optional notes?
  3. Need currency support for multi-region use?`,
    },
    {
      user: "4",
      prompt: "Yes to budgets and notes. Currency support isn’t needed for now.",
      chatId: "4",
      message: `Cool, last few questions:
  1. Should users see monthly summaries?
  2. Do you want to store account types (e.g., Cash, Bank, Credit)?
  3. Should transactions support tags in addition to categories?`,
    },
    {
      user: "4",
      prompt: "Yes to all",
      chatId: "4",
      message: `Here's your schema:
  
  {
    "schema": {
      "users": {
        "fields": {
          "_id": "ObjectId",
          "email": "string",
          "passwordHash": "string",
          "createdAt": "Date"
        }
      },
      "accounts": {
        "fields": {
          "_id": "ObjectId",
          "userId": "ObjectId(ref: users)",
          "name": "string",
          "type": "string(enum: Cash|Bank|Credit)",
          "balance": "number",
          "createdAt": "Date"
        }
      },
      "categories": {
        "fields": {
          "_id": "ObjectId",
          "userId": "ObjectId(ref: users)",
          "name": "string",
          "type": "string(enum: income|expense)",
          "createdAt": "Date"
        }
      },
      "transactions": {
        "fields": {
          "_id": "ObjectId",
          "userId": "ObjectId(ref: users)",
          "accountId": "ObjectId(ref: accounts)",
          "categoryId": "ObjectId(ref: categories)",
          "amount": "number",
          "type": "string(enum: income|expense)",
          "date": "Date",
          "tags": "string[]",
          "note": "string?",
          "recurring": "boolean",
          "createdAt": "Date"
        }
      },
      "budgets": {
        "fields": {
          "_id": "ObjectId",
          "userId": "ObjectId(ref: users)",
          "categoryId": "ObjectId(ref: categories)",
          "amount": "number",
          "month": "string(YYYY-MM)",
          "createdAt": "Date"
        }
      }
    },
    "indexes": [
      {"name": "user_transactions", "fields": ["userId", "date"]},
      {"name": "category_budgets", "fields": ["userId", "categoryId", "month"]}
    ]
  }`
    }
  ];
  