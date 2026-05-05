import { BalanceTitle, Loader, ErrorMessage, Page } from '@shared/ui';
import { ROUTES } from "@/core/conf";

import { useHelperCases } from './model';
import { Case } from './ui';

import s from './cases.module.scss';

export const CasesPage = () => {
  const { loading, balance, cases, error } = useHelperCases();

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <Page title='cases' subtitle='you were given a chance'>
      <div className={s.cases}>

        <BalanceTitle balance={balance} />

        <div className={s.cases_container}> {cases.map(c => (<Case key={c.id} c={c} to={ROUTES.CASE(c.id)} />))} </div>

      </div>
    </Page>
  );
};