import React from 'react';
import {View, Image, TouchableOpacity, Text, Linking} from 'react-native';
import { Feather } from '@expo/vector-icons';
import {useNavigation, useRoute} from '@react-navigation/native';
import * as MailComposer from 'expo-mail-composer';

import logoImg from '../../assets/logo.png';

import styles from './styles'

export default function Detail() {
    const navigation = useNavigation();
    const route = useRoute();

    const incident = route.params.incident;
    const message = `Olá ${incident.name}, estou entrando em contato pois gostaria de ajudar no caso "${incident.tittle}" com o valor de ${Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)}`;

    function navigateBack(){
        navigation.goBack();
    }

    function sendEmail(){
        MailComposer.composeAsync({
            subject: `Héroi do caso: ${incident.tittle}`,
            recipients: [incident.email],
            body: message,
        });
    }

    function sendWhatsapp(){
        Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`);
    }

    return(
        <View style = {styles.container}>
            <View style = {styles.header}>
                <Image source = {logoImg}/>

                <TouchableOpacity onPress = {navigateBack}>
                    <Feather name='arrow-left' size={28} color='#e82041'/>
                </TouchableOpacity> 

            </View>

            <View style = {styles.incident}>
            <Text style = {styles.incidentProperty}>ONG:</Text>
                        <Text style = {styles.incidentValue}>{incident.name} de {incident.city}/{incident.uf}</Text>

                        <Text style = {styles.incidentProperty}>CASO:</Text>
                        <Text style = {styles.incidentValue}>{incident.tittle}</Text>

                        <Text style = {styles.incidentProperty}>VALOR:</Text>
                        <Text style = {styles.incidentValue}>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)}</Text>

                    <TouchableOpacity
                        style = {styles.detailsButton}
                        onPress = {() => {}}
                    >
                        <Text style = {styles.detailsButtonText}>Ver mais detalhes</Text>
                        <Feather name='arrow-right' size={16} color='#e02041' />
                    </TouchableOpacity>
            </View>

            <View style = {styles.contactBox}>
                <Text style = {styles.heroTittle}>Salve o dia!</Text>
                <Text style = {styles.heroTittle}>Seja o heroi desse caso.</Text>
                <Text style = {styles.heroDescription}>Entre em contato:</Text>

                <View style = {styles.actions}>
                    <TouchableOpacity style = {styles.action} onPress = {sendWhatsapp}>
                        <Text style = {styles.actionText}>Whatsapp</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style = {styles.action} onPress = {sendEmail}>
                        <Text style = {styles.actionText}>E-mail</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}