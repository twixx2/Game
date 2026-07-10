import Big from "big.js";

import { Loader, ErrorMessage, BalanceTitle, Page, LoginRequired } from '@shared/ui';
import { usePlayer } from "@shared/hooks";
import { useAuth } from "@context";

import { Roulette, CaseDrop, CaseOptions, CasePreview } from './ui';
import { useHelperCase } from './model';

import s from './caseDetail.module.scss';

export const CaseDetail = () => {
  const { data: player } = usePlayer();
  const { isAuth } = useAuth();

  const { frameRef, trackRef, c, rolling, queue, loading, isOpen, received, openAgain, openCase, sellReceived, receive } = useHelperCase();

  if (loading) return <Loader />;
  if (!c) return <ErrorMessage message="Failed to load case" />;

  return (
    <Page title={c.name} subtitle="what's inside?">

      <BalanceTitle balance={player?.wallet.balance ?? new Big("0")} />

      <div className={s.case}>

        {queue.length > 0 ? <Roulette frameRef={frameRef} trackRef={trackRef} queue={queue} /> : <CasePreview c={c} />}

        {isAuth ?
          <CaseOptions rolling={rolling} isOpen={isOpen} c={c} received={received} actions={{ openCase: openCase, openAgain: openAgain, sellReceived: sellReceived, receive: receive }} />
          : <LoginRequired />}

        <CaseDrop c={c} />

      </div>

    </Page>
  );
};