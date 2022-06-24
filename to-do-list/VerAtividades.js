import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { View, TouchableHighlight, Text, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as SQLite from 'expo-sqlite';
import { Dimensions } from 'react-native';
import { Platform } from 'react-native';

const db = SQLite.openDatabase('todolist.db');
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class AtividadeComponent extends Component {
    onPressCallback = () => {
        console.log('Pressing atividade');
        let name, local, descricao, my_key;
        name = this.props.name;
        local = this.props.local;
        descricao = this.props.descricao;
        my_key = this.props.my_key;
        console.log("PROPS NO CALLBACK")
        console.log(this.props);

        this.props.navigation.navigate('DetalhesAtividade', {
            name: name,
            local: local,
            descricao: descricao,
            my_key: my_key,
        });
    }

    atividadeConcluida = () => {
        
    }

    render() {
        return (
            <TouchableHighlight
                underlayColor="#DDD"
                onPress={this.onPressCallback}
            >
            <>
            <View style={styles.rowContainer}>
                <View style={styles.itemColumn}>
                    <Text style={styles.txtName}>{this.props.name}</Text>
                    <Text style={styles.txtPhone}>{this.props.local}</Text>
                </View>
                <TouchableHighlight onPress>
                    <Icon name="check" size={20} color="gray" ></Icon>
                </TouchableHighlight>
            </View>
            <View
                style={{
                    borderBottomColor: 'lightgray',
                    borderBottomWidth: 1,
                    //width: "95vw",
                    marginTop: 5,
                    marginLeft: "auto",
                    marginRight: "auto",
                }}
            />
            </>
            </TouchableHighlight>
        );
    }
}

class VerAtividades extends Component {
    state = {
        data: [],
    }

    componentDidMount(){
        console.log("THIS.PROPS.NAVIGATONS "+this.props.navigation);
        this.props.navigation.addListener('didFocus', () => {
            console.log("TA EM FOCO $$$$$$$$$")
        });

        db.transaction(tx => {
            let query = `SELECT * FROM atividades;`;
            console.log(query);
            tx.executeSql(query, [], (t, results)=>{
                if (Platform.OS === 'android'){
                    this.setState({ data: results.rows._array });
                } else {
                    this.setState({ data: results.rows });
                }
            }, (t, error) => {
                console.log("Erro ao buscar as atividades");
                console.log(error);
            });
        });
    }

    renderAtividadeItem = ({ item }) => {
        if (item) {
            return (
                <AtividadeComponent
                    name={item.nome}
                    local={item.local}
                    descricao={item.descricao}
                    my_key={item.id}
                    navigation={this.props.navigation}
                />
            );
        }
    }

    renderSeparator = () => {
        return(
            <View
                style={{
                    backgroundColor: 'black',
                    height: 0.5,
                }}
            />
        );
    };

    renderEmptyWarning = () => {
        return(
            <Text>Sem atividades adicionadas.</Text>
        );
    }

    buttonPressed = () => {
        //this.props.navigation.navigate('Add Contact', { })
    }

    render() {
        return (
            <View style={[styles.column, { scrollEnabled: true }]}>
                <Text style={styles.title}>Atividades</Text>
                <FlatList
                    contentContainerStyle={styles.contentContainerStyle}
                    style={[styles.list]}
                    data={this.state.data}
                    renderItem={this.renderAtividadeItem}
                    ItemSeparatorComponent={this.renderSeparator}
                    ListEmptyComponent={this.renderEmptyWarning}
                    extraData={this.state}
                />
                <TouchableHighlight
                    style={[styles.btn, styles.columnContainer]}
                    onPress={this.buttonPressed}
                >
                    <Text style={styles.btnText}>Adicionar</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        marginTop: windowHeight / 100,
        marginBottom: windowHeight / 100,
        marginLeft: windowWidth / 100,
        marginRight: windowHeight / 100,
        alignContent: 'center',
        flexDirection: 'row',
    },
    list: {
        width: windowWidth * .8,
    },
    columnContainer: {
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        flexDirection: "column",
    },
    itemColumn: {
        display: "flex",
        justifyContent: "flex-start"
    },
    column: {
        display: "flex",
        flex: 1,
        justifyContent: "center",
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    rowContainer: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        marginTop: 5,
    },
    txtName: {
        fontWeight: "bold",
    },
    txtPhone: {
        color: 'gray',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 0.03 * windowHeight,
        marginBottom: 0.02 * windowHeight 
    },
    btn: {
        borderRadius: 10,
        backgroundColor: '#0373F3',
        width: 250,
        height: 30,
        margin: 5
    },
    btnText: {
        color: "white",
        fontWeight: 'bold',
    },
});

export default VerAtividades;