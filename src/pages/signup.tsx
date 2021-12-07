import { FormEvent } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { Button, Input } from '~/components';

import styles from '~/styles/pages/signup.module.scss';

function SignUp(): JSX.Element {
  const router = useRouter();

  const handleSubmitSignUp = (event: FormEvent): void => {
    event.preventDefault();

    router.push('/user');
  };

  return (
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
          <Input name="name" label="Name" />
          <Input type="email" name="email" label="Email" />
          <Input type="password" name="password" label="Password" />
          <Input
            type="password"
            name="confirm_password"
            label="Confirm Password"
          />
          <p className={styles.SignUpAdvise}>
            In the account creation, you will be agree with the privacy poticies
            of Iphoto.
          </p>
          <Button type="submit" style={{ maxWidth: '100%' }}>
            Create account
          </Button>
        </form>
      </div>
    </section>
  );
}

export default SignUp;
