import { FormEvent, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { toast } from 'react-toastify';
import * as Yup from 'yup';

import { AnchorLink, Button, Input, Seo } from '~/components';
import { useAuth } from '~/contexts/AuthenticationContext';
import { IAuthenticationCredentials } from '~/models/Authentication';
import { handleYupValidationError } from '~/utils/functions';

import styles from '~/styles/pages/signin.module.scss';

function SignIn(): JSX.Element {
  const [formData, setFormData] = useState<IAuthenticationCredentials>(
    {} as IAuthenticationCredentials,
  );
  const { signin } = useAuth();
  const router = useRouter();

  const handleSubmitSignIn = async (event: FormEvent): Promise<void> => {
    event.preventDefault();

    const schema = Yup.object().shape({
      email: Yup.string().email().required('Email required.'),
      password: Yup.string().required('Password required.'),
    });

    try {
      await schema.validate(formData, {
        abortEarly: false,
      });

      await signin(formData);

      router.push('/user');
      toast.success('User logged.');
    } catch (error) {
      handleYupValidationError(error as Error);
    }
  };

  return (
    <>
      <Seo title="Login" />
      <section className={styles.SignIn}>
        <section className={styles.SignInContent}>
          <Image
            src="/assets/icons/iphoto-logo-black.svg"
            alt="SignIn"
            width={212}
            height={58}
            layout="fixed"
          />
          <h1 className={styles.SignInTitle}>Sign in with your account</h1>
          <form className={styles.SignInForm} onSubmit={handleSubmitSignIn}>
            <Input
              name="email"
              label="E-mail"
              placeholder="name@example.com"
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
            <Button type="submit" size="fullSize">
              Sign in
            </Button>
            <span className={styles.SignInFormOr}>or</span>

            <AnchorLink href="/signup" className={styles.SignUpLink}>
              Create a new account
            </AnchorLink>
          </form>
        </section>
      </section>
    </>
  );
}

export default SignIn;
