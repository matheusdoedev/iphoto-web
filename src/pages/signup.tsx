import { FormEvent, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

import * as Yup from 'yup';
import { toast } from 'react-toastify';

import { Button, Input, Seo } from '~/components';
import { ISignUpDto } from '~/models/Authentication';
import { useAuth } from '~/contexts/AuthenticationContext';
import { AuthenticationService } from '~/services';
import { handleYupValidationError } from '~/utils/functions';

import styles from '~/styles/pages/signup.module.scss';

function SignUp(): JSX.Element {
  const [formData, setFormData] = useState<ISignUpDto>({} as ISignUpDto);
  const [confirmPassword, setConfirmPassword] = useState('');

  const router = useRouter();
  const { signin } = useAuth();
  const authService = new AuthenticationService();

  const handleSubmitSignUp = async (event: FormEvent): Promise<void> => {
    event.preventDefault();

    const schema = Yup.object().shape({
      name: Yup.string().required('Name required.'),
      email: Yup.string().email().required('Email required.'),
      password: Yup.string().required('Password required.'),
    });

    try {
      if (formData.password !== confirmPassword) {
        throw new Error('Passwords must be equal.');
      }

      await schema.validate(formData, {
        abortEarly: false,
      });

      const { user } = await authService.signup(formData).then((r) => r.data);

      await signin({
        email: user.email,
        password: formData.password,
      });

      router.push('/user');
      toast.success('User created and logged.');
    } catch (error) {
      handleYupValidationError(error as Error);
    }
  };

  return (
    <>
      <Seo title="Create your account" />
      <section className={styles.SignUp}>
        <div className={styles.SignUpContent}>
          <Image
            src="/assets/icons/iphoto-logo-black.svg"
            alt="SignIn"
            width={212}
            height={58}
            layout="fixed"
          />
          <h1 className={styles.SignUpTitle}>Create a account</h1>
          <form className={styles.SignUpForm} onSubmit={handleSubmitSignUp}>
            <Input
              type="text"
              name="name"
              label="Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <Input
              type="email"
              name="email"
              label="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <Input
              type="password"
              name="password"
              label="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <Input
              type="password"
              name="confirm_password"
              label="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <p className={styles.SignUpAdvise}>
              In the account creation, you will be agree with the privacy
              poticies of Iphoto.
            </p>
            <Button type="submit" size="fullSize">
              Create account
            </Button>
          </form>
        </div>
      </section>
    </>
  );
}

export default SignUp;
