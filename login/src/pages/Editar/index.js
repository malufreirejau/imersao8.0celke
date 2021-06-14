import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Menu from '../../components/Menu';

import {Container, ConteudoTitulo, Titulo, BotaoAcao,
AlertDanger, AlertSuccess, ButtonInfo, Conteudo, Form, Label, Input, ButtonWarning } from '../../styles/custom_adm';

import api from '../../config/configApi';

export const Editar = (props) => {

    const [id] = useState(props.match.params.id);
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const [status, setStatus] = useState({
        type: '',
        messagem: ''

    });

    const editUsuario = async e => {
        e.preventDefault();

        const headers = {
            'Content-Type': 'application/json'
        }

        await api.put("/usuario", {id, nome, email,senha}, {headers})
        .then((response) => {
            if(response.data.erro){
                setStatus({
                type: 'erro',
                messagem: response.data.messagem
            });
            }else{
                setStatus({
                type: 'success',
                messagem: response.data.messagem
            });
            }
        }).catch(() => {
            setStatus({
                type: 'erro',
                messagem: 'Erro: tente mais tarde'
            });
        })

    }

    useEffect(() => {
        const getUsuario = async () => {
            await api.get("/usuario/" + id)
            .then((response) => {
                if(response.data.erro){
                    setStatus({
                    type: 'erro',
                    messagem: response.data.messagem
                    });  
                }else {
                    setNome(response.data.usuario.nome);
                    setEmail(response.data.usuario.email);
                    
                }
                
            })
            .catch (() => {
                setStatus({
                    type: 'erro',
                    messagem: "Erro: tente mais tarde!"
                    

                });
            });
        }

    getUsuario();
    },[id]);

    return(
        <Container>
            <Menu />
            <ConteudoTitulo>
                <Titulo>Editar Usuário</Titulo>
                <BotaoAcao>
                    <Link to="/listar">
                        <ButtonInfo>
                            Listar
                        </ButtonInfo>
                    </Link>
                </BotaoAcao>
             </ConteudoTitulo>
            <Conteudo>

                {status.type === 'erro' ? <AlertDanger>{status.messagem}</AlertDanger>: ""}
                {status.type === 'success' ? <AlertSuccess>{status.messagem}</AlertSuccess>: ""}

            <Form onSubmit={editUsuario}>
                 
                 <Label>Nome: </Label>
                    <Input type="text" name="nome" placeholder="Nome do usuário" value={nome} 
                    onChange={e => setNome(e.target.value)} />

                 <Label>E-mail: </Label>
                    <Input type="email" name="email" placeholder="E-mail do usuário" value={email} 
                    onChange={e => setEmail(e.target.value)} />

                    <Label>Senha: </Label>
                    <Input type="password" name="senha" placeholder="Senha para acessar o administrativo" autoComplete="on"  
                    onChange={e => setSenha(e.target.value)} />

                 <ButtonWarning type="submit">Editar</ButtonWarning>

             </Form>

       
            </Conteudo>         
    
  </Container>
 )
}