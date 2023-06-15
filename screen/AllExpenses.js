import { View, Text, FlatList} from "react-native";
import { EXPENSES } from "../data/expenses";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useContext } from "react";
import { ExpenseContext } from "../store/expenses-context";

function AllExpenses(){
  const expensesContext = useContext(ExpenseContext);

    return (
      <ExpensesOutput expenses={expensesContext.expenses} expensesPeriod={"Last 7 days."}/>
    );
};

export default AllExpenses;