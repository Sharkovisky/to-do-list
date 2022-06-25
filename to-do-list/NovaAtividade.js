import { Component } from 'react';
import { StyleSheet, Text, TouchableHighlight, View, TextInput, Dimensions } from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('todolist.db');
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class NovaAtividade extends Component {
    state = {
        nome: 'Nome da atividade',
        local: 'Local da atividade',
        descricao: 'Descrição da atividade',
        key: undefined,
        editMode: false,
        concluido: false,
    }

    componentDidMount(){
        console.log(this.props.route.params);
        if (this.props.route.params){
            let atividade = this.props.route.params.atividade
            //console.log(atividade);
            this.setState({
                nome: atividade.name,
                local: atividade.localization,
                descricao: atividade.description,
                sucesso: [],
                key: atividade.key,
            });
        }

        // db.transaction(tx => {
        //     tx.executeSql("DROP TABLE atividades")
        // })
        db.transaction(tx => {
            tx.executeSql("CREATE TABLE IF NOT EXISTS atividades (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, local TEXT, descricao TEXT, concluido BOOLEAN);");
        }, error => {
            console.log("error callback: "+JSON.stringify(error));
            console.log(error);
        }, () => {
            console.log('table created')
        });
    }

        inserir = () => {
            db.transaction(tx => {
                let query;
                let queryParams = [this.state.nome, this.state.local, this.state.descricao, this.state.concluido];
                let msgAction = ''
                if (this.state.editMode){
                    query = `UPDATE atividades set nome=?, local=?, descricao=?, concluido=? where id=?;`;
                    queryParams.push(this.state.key);
                    msgAction = 'atualizada'
                } else {
                    query = `INSERT INTO atividades (nome, local, descricao, concluido) VALUES (?, ?, ?, ?);`;
                    //queryParams.push(this.props.route.params.user_id);
                    queryParams.push();
                    msgAction = 'inserida'
                }
                tx.executeSql(query, queryParams, (t, r)=>{
                    let msg = `Atividade conseguiu ser ${msgAction}!`
                    this.setState({sucesso: [{key: msg, message: msg}]});
                    console.log(queryParams);
                    console.log("Inserido no banco");
                    this.props.navigation.navigate('VerAtividades');
                }, (t, error)=>{
                    console.log(error);
                }
                );
            })
    }

    nomeChanged = (text) =>{
        this.setState({ nome: text });
    }

    localChanged = (text) =>{
        this.setState({ local: text});
    }

    descricaoChanged = (text) => {
        this.setState({ descricao: text });
    }

    render(){
        return (
            <View style={styles.container}>
                <Text style={styles.title}>{this.state.title}</Text>
                <View style={styles.columnContainer}>
                    <TextInput
                        style={styles.input}
                        value={this.state.nome}
                        onChangeText={(text)=>this.nomeChanged(text)}
                        onFocus={() => !this.state.editMode ? this.setState({ nome: ''}): ()=>{}}
                    />
                    <TextInput
                        style={styles.input}
                        value={this.state.local}
                        onChangeText={(text) => this.localChanged(text)}
                        onFocus={() => !this.state.editMode ? this.setState({ local: ''}) : ()=>{}}
                    />
                    <TextInput
                        style={styles.input}
                        value={this.state.descricao}
                        onChangeText={(text) => this.descricaoChanged(text)}
                        onFocus={() => !this.state.editMode ? this.setState({ descricao: ''}) : ()=>{}}
                    />
                    <TouchableHighlight
                        style={[styles.btn, styles.columnContainer]}
                        onPress={this.inserir}
                    >
                        <Text style={styles.btnText}>Adicionar</Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        alignContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF'
    },
    columnContainer: {
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        flexDirection: "column",
    },
    column: {
        display: "flex",
        justifyContent: "center",
    },
    rowContainer: {
        display: "flex",
        justifyContent: "space-around",
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
        fontSize: windowHeight * 0.03,
        marginLeft: windowWidth * 0.05,
        marginBottom: windowHeight * 0.03
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
    input: {
        height: 40,
        width: 250,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});

export default NovaAtividade;
