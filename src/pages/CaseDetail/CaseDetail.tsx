import { Loader, ErrorMessage, BalanceTitle, Page, LoginRequired } from '@shared/ui';

import { Roulette, CaseDrop, CaseOptions, CasePreview } from './ui';
import { useHelperCase } from './model';

import s from './caseDetail.module.scss';

export const CaseDetail = () => {

  const { balance, frameRef, trackRef, c, items, rolling, queue, loading, error, isOpen, isAuth, win, received, openAgain, openCase, sellReceived, receive } = useHelperCase();

  if (loading) return <Loader />;
  if (!c || error) return <ErrorMessage message={error} />;

  return (
    <Page title={c.title} subtitle="what's inside?">

      <BalanceTitle balance={balance} />

      <div className={s.case}>

        {queue.length > 0 ? <Roulette frameRef={frameRef} trackRef={trackRef} queue={queue} /> : <CasePreview c={c} />}

        {isAuth ?
          <CaseOptions rolling={rolling} isOpen={isOpen} c={c} win={win} received={received} actions={{ openCase: openCase, openAgain: openAgain, sellReceived: sellReceived, receive: receive }} />
          : <LoginRequired />}


        <CaseDrop c={c} items={items} />

      </div>

    </Page>
  );
};