import React, {useState} from 'react';
import {Alert} from 'react-native';
import moment from 'moment';
import * as yup from 'yup';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import 'react-native-get-random-values';
import Geolocation from 'react-native-geolocation-service';
import {v4 as uuidv4} from 'uuid';

import {useNavigation} from '@react-navigation/native';

import Input from '../../components/Input';
import Button from '../../components/Button';
import Header from '../../components/Header';

import {useRealm} from '../../libs/realm/index';
import {Annotation} from '../../libs/realm/schemas/Annotation';

import {Container} from './styles';

interface FormDataProps {
  annotation: string;
}

const formSchema = yup
  .object({
    annotation: yup.string().required('Informe uma anotação.'),
  })
  .required();

export default function AddAnnotation() {
  const realm = useRealm();
  const {goBack} = useNavigation();

  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormDataProps>({
    resolver: yupResolver(formSchema),
  });

  async function handleAddSamplePoints({annotation}: FormDataProps) {
    try {
      setIsLoading(true);
      await Geolocation.getCurrentPosition(
        position => {
          realm.write(() => {
            realm.create(
              'Annotation',
              Annotation.generate({
                id: uuidv4(),
                synced: 'false',
                latitude: position.coords.latitude.toString(),
                longitude: position.coords.longitude.toString(),
                annotation,
                datetime: moment().format('YYYY-MM-DD HH:mm:ss'),
              }),
            );
          });
          goBack();
        },
        error => {
          if (error.code === 1) {
            Alert.alert(
              'Erro',
              'Para adicionar uma anotação, é necessário permitir o acesso à localização.',
            );
          }
        },
      );
    } catch (error) {
      Alert.alert(
        'Erro',
        'Não possível salvar a anotação, tente novamente mais tarde!',
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Header title="Nova Anotação" />

      <Container>
        <Controller
          control={control}
          name="annotation"
          render={({field: {onChange, value}}) => (
            <Input
              placeholder="Anotação"
              onChangeText={onChange}
              value={value}
              messageError={errors.annotation?.message}
              onSubmitEditing={handleSubmit(handleAddSamplePoints)}
            />
          )}
        />

        <Button
          type="PRIMARY"
          title="Adicionar"
          mt={10}
          textLoading="Carregando..."
          loading={isLoading}
          onPress={handleSubmit(handleAddSamplePoints)}
        />
      </Container>
    </>
  );
}
