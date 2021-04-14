import * as React from 'react'
import {Formik, FormikProps, Form} from 'formik'
import axios from 'axios'
import * as Yup from 'yup'
import Input from '../../components/input/input'
import Button from '../../components/button/button'
import {IoLogoTwitter, IoLogoInstagram, IoLogoLinkedin} from 'react-icons/io'
import {
  ContactWrapper,
  ContactPageTitle,
  ContactFromWrapper,
  InputGroup,
} from './style'
import SocialProfile from '../../components/social-profile/social-profile'

const SocialLinks = [
  {
    icon: <IoLogoInstagram />,
    url: 'https://www.instagram.com/tylerjnewman/',
    tooltip: 'Instagram',
  },
  {
    icon: <IoLogoTwitter />,
    url: 'https://twitter.com/tylerjnewman',
    tooltip: 'Twitter',
  },
  {
    icon: <IoLogoLinkedin />,
    url: 'https://www.linkedin.com/tylerthecreator',
    tooltip: 'Linked In',
  },
]

interface MyFormValues {
  firstName: string
  email: string
  message: string
}

const SignupSchema = Yup.object().shape({
  firstName: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  message: Yup.string().required('Required'),
})

const handleServerResponse = (
  values: MyFormValues,
  {setSubmitting, setErrors, setStatus, resetForm}: any,
) => {
  axios({
    method: 'post',
    url: 'https://getform.io/f/64f778fd-0294-4837-b219-0450867cac29',
    data: values,
  })
    .then((r) => {
      resetForm({})
      setStatus({success: true})
    })
    .catch((error) => {
      setStatus({success: false})
      setErrors({submit: error.message})
    })
    .finally(() => {
      setSubmitting(false)
    })
}

const Contact: React.SFC<{}> = () => {
  return (
    <Formik
      initialValues={{firstName: '', email: '', message: ''}}
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
              <div style={{marginLeft: -6, marginTop: 64}}>
                <SocialProfile items={SocialLinks} />
              </div>
            </ContactWrapper>
          </Form>
        </>
      )}
    />
  )
}

export default Contact
