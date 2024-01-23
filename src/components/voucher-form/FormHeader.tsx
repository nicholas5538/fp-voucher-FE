import clsx from 'clsx';

type FormHeaderProps = {
  isSubmitSuccessful: boolean;
  watchAction: 'Create' | 'Update' | 'Delete';
};
export default function FormHeader({
  isSubmitSuccessful,
  watchAction,
}: FormHeaderProps) {
  return (
    <div
      className={clsx('border-0 border-b border-solid border-gray-700 pb-2', {
        'mb-0': isSubmitSuccessful,
        'mb-4': !isSubmitSuccessful,
      })}
    >
      <h2 className='ml-3 text-2xl font-semibold tracking-wider text-gray-700 xl:text-3xl'>
        {watchAction} voucher
      </h2>
    </div>
  );
}
