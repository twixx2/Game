import { BalanceTitle, Loader, Page } from '@shared/ui';
import { usePlayer } from '@shared/hooks';

import { useHelperCases } from './model';
import { CasesContent } from './ui';

import s from './cases.module.scss';
import Big from "big.js";

export const CasesPage = () => {
  const { loading, casesData } = useHelperCases();
  const { data: player } = usePlayer()

  if (loading) return <Loader />;

  return (
    <Page title='cases' subtitle='profit is just one click away'>
      <div className={s.cases}>

        <BalanceTitle balance={player?.wallet.balance ?? new Big("0")} />

        <CasesContent casesData={casesData} />

      </div>
    </Page>
  );
};