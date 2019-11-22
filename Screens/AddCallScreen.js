import React, { useState } from 'react';
import { View, StyleSheet,Platform } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Card, Button,Icon } from 'react-native-elements';
import CustomInput from '../components/CustomInput';
import Constainer from '../components/Constainer';
import { Formik } from 'formik';
import * as Yup from 'yup';

const AddCallScreen = () => {

  const [load, setLoad] = useState(false);
  const [isVisibleDateTime, setVisibleDateTime] = useState(false);

  function saveDate(values) {
    setLoad(true)
    console.log(values);
    setLoad(false)
  }


  return (
    <Constainer>

      <DateTimePicker
        isVisible={isVisibleDateTime}
        onCancel={()=>setVisibleDateTime(false)}
      />

      <Formik
        initialValues={{
          name: '',
          phone: '',
          purpose: '',
          dates:''
        }}

        validationSchema={Yup.object().shape({
          name: Yup.string('Number not allowed').required('Please Provide Name').min(3),
          phone: Yup.number().required('Please provide phone number').min(10),
          purpose: Yup.string().min(5, 'Please provide a nimimum of 5 characters').max(30, 'Please provide a maximum characters of 30'),
          dates: Yup.string().required('Please select date')
        })}

        onSubmit={(values) => saveDate(values)}
      >
        {({ setFieldValue, errors, handleSubmit, setFieldTouched, values, touched }) => (
          <React.Fragment>
            <Card>
              <View style={styles.marginIput}>
                <CustomInput
                  label='FullName'
                  onChange={setFieldValue}
                  onTouched={setFieldTouched}
                  value={values.name}
                  name='name'
                  error={touched.name && errors.name}
                />
              </View>

              <View style={styles.marginIput}>
                <CustomInput
                  label='Phone Number'
                  onChange={setFieldValue}
                  onTouched={setFieldTouched}
                  value={values.phone}
                  name='phone'
                  error={touched.phone && errors.phone}

                />
              </View>

              <View style={styles.marginIput}>
                <CustomInput
                  label='Purpose'
                  onChange={setFieldValue}
                  onTouched={setFieldTouched}
                  value={values.purpose}
                  name='purpose'
                  error={touched.purpose && errors.purpose}
                />
              </View>

              <View style={styles.marginIput}>
                <CustomInput
                  label='Date/Time'
                  onChange={setFieldValue}
                  onTouched={setFieldTouched}
                  value={values.dates}
                  name='dates'
                  error={touched.dates && errors.dates}
                  rightIcon={
                     <Icon name='home' onPress={()=>alert('Icon Click')}/>
                  }
                />
              </View>

              <Button title='Add' type='solid' onPress={handleSubmit} loading={load} />

            </Card>

          </React.Fragment>
        )}
      </Formik>

    </Constainer>
  );
}

const styles = StyleSheet.create({
  marginIput: {
    marginBottom: 10
  }
})

export default AddCallScreen;