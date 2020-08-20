import * as React from 'react';
import { Formik, FormikProps, Form } from 'formik';
import axios from "axios";
import * as Yup from 'yup';
import Input from '../../components/input/input';
import Button from '../../components/button/button';
import {
  ContactWrapper,
  ContactPageTitle,
  ContactFromWrapper,
  InputGroup,
} from './style';

interface MyFormValues {
  firstName: string;
  email: string;
  message: string;
}

const SignupSchema = Yup.object().shape({
  firstName: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  message: Yup.string().required('Required'),
});

const handleServerResponse = (values: MyFormValues, { setSubmitting, setErrors, setStatus, resetForm }: any) => {
  axios({
    method: "post",
    url: "https://getform.io/f/64f778fd-0294-4837-b219-0450867cac29",
    data: values
  })
    .then(r => {
      resetForm({})
      setStatus({ success: true })
    })
    .catch(error => {
      setStatus({ success: false })
      setErrors({ submit: error.message })
    })
    .finally(() => {
      setSubmitting(false)
    });
}

const Contact: React.SFC<{}> = () => {
  return (
    <Formik
      initialValues={{ firstName: '', email: '', message: '' }}
      onSubmit={(values: MyFormValues, actions: any) => {
        // setTimeout(() => {
        //   console.log({ values, actions });
        //   alert(JSON.stringify(values, null, 2));
        //   actions.setSubmitting(false);
        // }, 700);
        handleServerResponse(values, actions)
      }}
      validationSchema={SignupSchema}
      render={({
        handleChange,
        values,
        errors,
        handleBlur,
        touched,
        isSubmitting,
      }: FormikProps<MyFormValues>) => (
          <>
            <Form>
              <ContactWrapper>
                <ContactPageTitle>
                  <h2>Contact</h2>
                  <p>
                    “In the land of the blind, the one-eyed man is a hallucinating idiot...for he sees what no one else does: things that, to everyone else, are not there.”
                </p>
                </ContactPageTitle>
                <ContactFromWrapper>
                  <InputGroup>
                    <Input
                      type="text"
                      name="firstName"
                      value={`${values.firstName}`}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      label="Name"
                      notification={`${
                        errors.firstName && touched.firstName
                          ? errors.firstName
                          : ''
                        }`}
                    />
                    <Input
                      type="email"
                      name="email"
                      value={`${values.email}`}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      label="Email"
                      notification={`${
                        errors.email && touched.email ? errors.email : ''
                        }`}
                    />
                  </InputGroup>
                  <Input
                    type="textarea"
                    name="message"
                    value={`${values.message}`}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label="Message"
                    notification={
                      errors.message && touched.message ? errors.message : ''
                    }
                  />
                  <Button
                    title="Submit"
                    type="submit"
                    isLoading={isSubmitting ? true : false}
                    loader="Submitting.."
                  />
                </ContactFromWrapper>
              </ContactWrapper>
            </Form>
          </>
        )}
    />
  );
};

export default Contact;
