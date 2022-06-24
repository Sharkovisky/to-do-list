import { Component } from 'react';
import { StyleSheet } from 'react-native';
import { View, TouchableHighlight, Text, Alert } from 'react-native';
import { Dimensions } from 'react-native';
import * as SQLite from 'expo-sqlite';

const windowWidth = Dimensions.get('window').width;
const db = SQLite.openDatabase('todolist.db');

class DetalhesComponent extends Component {
    editPressed = () => {
        console.log('edit pressed');

        Alert.alert(
            "Editar?",
            "Você quer realmente editar?",
            [
                {
                    text: "Não",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "Sim",
                    onPress: () => {
                        console.log("PROPS ON EDIT");
                        console.log(this.props);
                        let atividade = {
                            nome: this.props.name,
                            local: this.props.local,
                            descricao: this.props.descricao,
                            key: this.props.my_key
                        }
                        this.props.navigation.navigate('NovaAtividade', {
                                atividade: atividade,
                            }
                        );
                    }
                }
            ]
        );
    }

    deletePressed = () => {
        console.log('delete pressed');
        // Alert.alert(
        //     "Deletar",
        //     "Você quer realmente deletar?",
        //     [
        //         {
        //             text: "Não",
        //             onPress: () => console.log("Cancel Pressed"),
        //             style: "cancel"
        //         },
        //         {
        //             text: "Sim", onPress: () => {
        //                 db.transaction(tx => {
        //                     let query = `DELETE FROM atividades WHERE id=${this.props.my_key};`
        //                     console.log(query)
        //                     tx.executeSql(query);
        //                 }, error => {
        //                     console.log("Error callback: "+JSON.stringify(error));
        //                     console.log(error);
        //                 }, (what)=>{
        //                     this.props.navigation.navigate('NovaAtividade');
        //                 });
        //             }
        //         }
        //     ]
        // );
        db.transaction(tx => {
            let query = `DELETE FROM atividades WHERE id=${this.props.my_key};`
            console.log(query)
            tx.executeSql(query);
        }, error => {
            console.log("Error callback: "+JSON.stringify(error));
            console.log(error);
        }, (what)=>{
            this.props.navigation.navigate('VerAtividades');
        });
    }

    render() {
        return(
            <View style={StyleSheet.columnContainer}>
                <Text style={styles.txtName}>{this.props.name}</Text>
                <Text style={styles.txtPhone}>{this.props.local}</Text>
                <Text style={styles.txtPhone}>{this.props.descricao}</Text>
                <View style={styles.rowContainer}>
                    <TouchableHighlight
                        onPress={this.editPressed}
                        underlayColor="none"
                    >
                        <Text style={styles.editBtn}>Editar</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        onPress={this.deletePressed}
                        underlayColor="none"
                    >
                        <Text style={styles.deleteBtn}>Deletar</Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}

class DetalhesAtividade extends Component {
    state = {
        name: '',
        local: '',
        descricao: '',
        key: '',
    }

    componentDidMount(){
        let name, local, descricao, key;
        name = this.props.route.params.name;
        local = this.props.route.params.local;
        descricao = this.props.route.params.descricao;
        key = this.props.route.params.my_key;
        this.setState({name: name, local: local, descricao: descricao, key: key});
    }

    render(){
        return(
            <DetalhesComponent
                name={this.state.name}
                local={this.state.local}
                descricao={this.state.descricao}
                key={this.state.key}
                my_key={this.state.key}
                navigation={this.props.navigation}
            />
        );
    }
}
const styles = StyleSheet.create({
    columnContainer: {
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: 'white',
        flex: 1,
    },
    rowContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        alignContent: 'center',
        flexDirection: "row",
    },
    txtName: {
        fontWeight: "bold",
        fontSize: windowWidth * 0.08,
    },
    txtPhone: {
        color: 'gray',
        fontSize: windowWidth * 0.05,
    },
    editBtn: {
        borderRadius: 5,
        backgroundColor: '#0373F3',
        color: 'white',
        textAlign: 'center',
        width: windowWidth * 0.18,
        fontSize: windowWidth * 0.04,
        margin: 2,
        padding: 8
    },
    deleteBtn: {
        borderRadius: 5,
        backgroundColor: 'red',
        color: 'white',
        textAlign: 'center',
        width: windowWidth * 0.18,
        fontSize: windowWidth * 0.04,
        padding: 8,
        margin: 2,
    },
    btn: {
        height: windowWidth * 0.05,
    }
});
export default DetalhesAtividade;