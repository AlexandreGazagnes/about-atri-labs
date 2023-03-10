import create from "zustand";

// unsafe merge state
// and mew properties will added or existing properties will be changed
// but the type of value of the property must not change
function mergeState(baseState, newState) {
  if (
    typeof newState === "object" &&
    !Array.isArray(newState) &&
    newState !== null
  ) {
    const keys = Object.keys(newState);
    keys.forEach((key) => {
      // create a new key in base if not exists
      if (!(key in baseState)) {
        baseState[key] = {};
      }
      if (typeof newState[key] === "object" && !Array.isArray(newState[key]))
        mergeState(baseState[key], newState[key]);
      else baseState[key] = newState[key];
    });
  }
}

const useStore = create((set) => {
  return {
    setPage: (pageName, newState) =>
      set((state) => {
        const pageState = JSON.parse(JSON.stringify(state[pageName]));
        mergeState(pageState, newState);
        return { [pageName]: pageState };
      }),
  };
});

export function updateStoreStateFromController(pageName, newState) {
  useStore.getState().setPage(pageName, newState);
}

const desktopModeProps = {
  ...{
  "Home": {
    "Div4": {
      "callbacks": {}
    },
    "Div5": {
      "callbacks": {}
    },
    "Button1": {
      "custom": {
        "text": "Hello"
      },
      "callbacks": {
        "onClick": [
          {
            "navigate": {
              "type": "internal",
              "url": "/hello"
            }
          }
        ]
      }
    },
    "TextBox5": {
      "custom": {
        "text": "MA SUPER APP"
      },
      "callbacks": {
        "onClick": [
          {
            "sendEventData": true
          }
        ]
      }
    }
  },
  "hello": {
    "Div6": {
      "callbacks": {}
    },
    "TextBox6": {
      "custom": {
        "text": "Attente de réponse..."
      },
      "callbacks": {
        "onClick": [
          {
            "sendEventData": true
          }
        ]
      }
    },
    "Form1": {
      "custom": {
        "target": "_self",
        "autocomplete": "off",
        "types": [
          "text",
          "password"
        ],
        "labels": [
          "Enter your name:",
          "Password:"
        ],
        "placeholders": [
          "Enter your name",
          "Password"
        ],
        "ids": [
          "name",
          "pwd"
        ],
        "showResetButton": true,
        "submitButtonBgColor": "#1890ff",
        "submitButtonColor": "#fff",
        "resetButtonBgColor": "#fff",
        "resetButtonColor": "#000",
        "form": [
          {
            "selectedOption": "text",
            "text": {
              "label": "number_1:",
              "id": "number_1",
              "placeholder": "Enter a number"
            }
          },
          {
            "selectedOption": "text",
            "password": {
              "label": "Password:",
              "id": "pwd",
              "placeholder": "Enter your password"
            },
            "text": {
              "label": "number_2:",
              "id": "number_2:",
              "placeholder": "number_1:"
            }
          }
        ]
      },
      "callbacks": {
        "onClick": [
          {
            "sendEventData": true
          }
        ]
      }
    }
  }
}};

useStore.setState(desktopModeProps);

export default useStore;
