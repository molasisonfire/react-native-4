import { createContext, useReducer } from "react";


const DUMMY_EXPENSES = [
    {
        id: 'e11',
        description: 'A pair of shoes',
        amount: 50.00,
        date: new Date('2021-12-19')
    },
    {
        id: 'e22',
        description: 'A pair of trousers',
        amount: 320.00,
        date: new Date('2022-11-29')
    },
    {
        id: 'e33',
        description: 'Bananas',
        amount: 3.00,
        date: new Date('2021-10-11')
    },
    {
        id: 'ea44',
        description: 'Book',
        amount: 23.00,
        date: new Date('2022-02-07')
    },
    {
        id: 'ea55',
        description: 'Another Book',
        amount: 17.98,
        date: new Date('2020-01-17')
    },
    {
        id: 'a61',
        description: 'A pair of shoes',
        amount: 50.00,
        date: new Date('2021-12-19')
    },
    {
        id: 'ea2',
        description: 'A pair of trousers',
        amount: 320.00,
        date: new Date('2022-11-29')
    },
    {
        id: 'ea3',
        description: 'Bananas',
        amount: 3.00,
        date: new Date('2021-10-11')
    },
    {
        id: 'ea4',
        description: 'Book',
        amount: 23.00,
        date: new Date('2022-02-07')
    },
    {
        id: 'ea5',
        description: 'Another Book',
        amount: 17.98,
        date: new Date('2020-01-17')
    },
]


export const ExpenseContext = createContext({
    expenses: [],
    addExpense: ({ description, amount , date}) => {},
    deleteExpense:(id) => {}, 
    updateExpense: (id, {description,amount,date}) => {}
});

function expensesReducer(state,action){
    switch (action.type){
        case 'ADD': 
            const id = new Date().toString() + Math.random().toString();
            return [{...action.payload, id: id}, ...state];
        case 'UPDATE':
            const updateableExpenseIndex = state.findIndex((expense) => expense.id === action.payload.id);
            const updatableExpense = state[updateableExpenseIndex];
            const updatedItem={ ...updatableExpense, ...action.payload.data};
            const updatedExpenses = [...state];
            updatedExpenses[updateableExpenseIndex] = updatedItem;
            return updatedExpenses;
        case 'DELETE':
            return state.filter((expense) => expense.id !== action.payload)
        default:
            return state;
    }
}

function ExpensesContextProvider({children}){
    const [expensesState, dispatch] = useReducer(expensesReducer,DUMMY_EXPENSES);

    function addExpense(expenseData){
        dispatch({type: 'ADD', payload: expenseData});
    }

    function deleteExpense(id){
        dispatch({type: 'DELETE', payload: id});
    }

    function updateExpense(id,expenseData){
        dispatch({type: 'UPDATE', payload: {id: id, data: expenseData}});
    }

    const value = {
        expenses: expensesState,
        addExpense: addExpense,
        deleteExpense: deleteExpense,
        updateExpense: updateExpense
    };

    return <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
}

export default ExpensesContextProvider;