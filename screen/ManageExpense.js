import { useContext, useLayoutEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import IconButton from "../UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import Button from "../UI/Button";
import { ExpenseContext } from "../store/expenses-context";

function ManageExpense({route, navigation}){
    const expenseContext = useContext(ExpenseContext);
    const editedExpenseId = route.params?.expenseId;
    const isEditing = !!editedExpenseId;

    useLayoutEffect(()=>{
        navigation.setOptions({
            title: isEditing? 'Edit Expense' : 'Add Expense'
        });
    },[navigation, isEditing]);

    function deleteExpenseHandler(){
        expenseContext.deleteExpense(editedExpenseId);
        navigation.goBack();
    }

    function cancelHandler(){
        navigation.goBack();
    }

    function confirmHandler(){
        if(isEditing){
            expenseContext.updateExpense(editedExpenseId, {description:'test', amount : 99.99, date: new Date('2022-02-02')});
        }else{
            expenseContext.addExpense({description:'test', amount : 99.99, date: new Date('2022-02-02')});
        }
        navigation.goBack();
    }

    return (<View style={styles.container}>
        <View style={styles.buttons}>
            <Button style={styles.button} mode='flat' onPress={cancelHandler}> Cancel</Button>
            <Button style={styles.button} onPress={confirmHandler}>{isEditing? 'Update':'Add'}</Button>
        </View>
        {isEditing && 
        <View style={styles.deleteContainer}>
            <IconButton icon="trash" color={GlobalStyles.colors.error500} size={36} onPress={deleteExpenseHandler}/>
        </View>}
        <IconButton/>
        <IconButton/>
    </View>);
}

export default ManageExpense;

const styles = StyleSheet.create({
    deleteContainer:{
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: 'center'
    },
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary800
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button:{
        minWidth: 120,
        marginHorizontal: 8

    }
})