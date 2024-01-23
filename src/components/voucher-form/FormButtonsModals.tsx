import { useState, type BaseSyntheticEvent } from 'react';
import type { NavigateFunction } from 'react-router-dom';
import ButtonGroup from '@mui/material/ButtonGroup';
import ButtonComponent from '../button';
import icons from './icons';
import ModalComponent from '../modal';
import type { voucherFormValues } from '../../constants/globalTypes';
import type {
  DefaultValues,
  KeepStateOptions,
  SubmitHandler,
  SubmitErrorHandler,
} from 'react-hook-form';

type FormButtonsProps = {
  disabledWatchAction: boolean;
  handleSubmit: (
    onValid?: SubmitHandler<voucherFormValues>,
    onInvalid?: SubmitErrorHandler<voucherFormValues>,
  ) => (e?: BaseSyntheticEvent) => Promise<void>;
  navigate: NavigateFunction;
  isDirty: boolean;
  isValid: boolean;
  isSubmitting: boolean;
  onSubmit: SubmitHandler<voucherFormValues>;
  reset: (
    values?: DefaultValues<voucherFormValues> | voucherFormValues,
    keepStateOptions?: KeepStateOptions,
  ) => void;
};

export default function FormButtonsModals({
  disabledWatchAction,
  handleSubmit,
  navigate,
  isDirty,
  isValid,
  isSubmitting,
  onSubmit,
  reset,
}: FormButtonsProps) {
  const [openModal, setOpenModal] = useState(() => false);
  const [openDeleteModal, setDeleteModal] = useState(() => false);

  return (
    <>
      <ButtonGroup
        color='secondary'
        aria-label='contained secondary button group'
      >
        {disabledWatchAction ? (
          <>
            <ButtonComponent
              isLoadingButton={false}
              label='Delete'
              onClick={() => setDeleteModal(true)}
              startIcon={icons.delete}
            />
            <ModalComponent
              modalTitle='Are you sure you want to delete the voucher?'
              modalDesc='Warning, all actions are irreversible.'
              clickHandler={() => {
                handleSubmit(onSubmit)();
                setDeleteModal((prevState) => !prevState);
              }}
              openModal={openDeleteModal}
              setOpenModal={setDeleteModal}
            />
          </>
        ) : (
          <>
            <ButtonComponent
              disabled={!isDirty || !isValid}
              isLoadingButton={true}
              isSubmitting={isSubmitting}
              label='Confirm'
              startIcon={icons.send}
            />
            <ButtonComponent
              disabled={!isDirty}
              isLoadingButton={false}
              label='Reset'
              onClick={() => reset()}
              startIcon={icons.reset}
            />
          </>
        )}
        <ButtonComponent
          isLoadingButton={false}
          label='Cancel'
          onClick={() => setOpenModal(true)}
          startIcon={icons.cancel}
        />
      </ButtonGroup>
      <ModalComponent
        modalTitle='Are you sure you want to cancel?'
        modalDesc='Warning, all changes are not saved upon clicking on Yes.'
        clickHandler={() => navigate('/')}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </>
  );
}
