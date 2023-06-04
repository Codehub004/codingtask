import { Dispatch, FC, useState } from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../app/hook";
import { ContactState, addOrUpdate, deleteContact } from "../app/createContact";

const Contacts = () => {
  const [isCreating, setIsCreating] = useState(false)
  const [updateContact, setUpdateContact] = useState<ContactState>()
  const contacts = useAppSelector(state => state.contact)

  const dispatch = useAppDispatch()

  return (
    <div className="w-full h-screen p-4 md:p-20 flex flex-col items-center gap-10">
      <h1 className="text-green-950 font-semibold text-2xl">Contacts Page</h1>
      {isCreating ?
        <div className="flex flex-col items-center gap-10 w-full">
          <ContactCreation setIsCreating={setIsCreating} updateContact={updateContact} setUpdateContact={setUpdateContact} />
          <button onClick={() => setIsCreating(false)} className="bg-red-500 text-white rounded-xl py-4 px-6 text-2xl hover:bg-red-700 transition-colors ease-in-out duration-200">Cancel</button>
        </div>
        :
        <div className="flex flex-col items-center gap-10 w-full">
          <button onClick={() => setIsCreating(true)} className="bg-green-500 text-white rounded-xl py-4 px-6 text-2xl hover:bg-green-700 transition-colors ease-in-out duration-200">Create Contact</button>
          {
            contacts.length === 0 ?
              <h1 className="text-green-800 font-semibold text-2xl">No Contacts availble to preview</h1>
              :
              contacts.map((contact, index) => (
                <ul key={index} className="flex flex-row items-center gap-4 w-full md:w-1/2">
                  <div className="flex flex-row items-center justify-between w-full px-4 py-2 bg-green-300  rounded-full">
                    <h1 className="text-xl text-green-900 font-medium">
                      {contact.firstName} {contact.lastName}
                    </h1>
                    <p className="text-green-950 font-semibold text-xl uppercase">{contact.status}</p>
                  </div>
                  <button
                    onClick={() => {
                      setIsCreating(true)
                      setUpdateContact(contact)
                    }}
                    className="bg-blue-500 text-white rounded-xl p-2 text-sm hover:bg-blue-700 transition-colors ease-in-out duration-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => dispatch(deleteContact(contact.id))}
                    className="bg-red-500 text-white rounded-xl p-2 text-sm hover:bg-red-700 transition-colors ease-in-out duration-200"
                  >
                    Delete
                  </button>
                </ul>
              ))
          }
        </div>
      }
    </div>
  )
};

type Inputs = {
  firstName: string,
  lastName: string,
  status: string,
  id?: number
};

interface ContactCreationProps {
  setIsCreating: (state: boolean) => void
  updateContact?: ContactState
  setUpdateContact: Dispatch<React.SetStateAction<ContactState | undefined>>
}

const ContactCreation: FC<ContactCreationProps> = ({ setIsCreating, updateContact, setUpdateContact }) => {
  const { handleSubmit, register } = useForm<Inputs>({
    defaultValues: {
      firstName: updateContact?.firstName || '',
      lastName: updateContact?.lastName || '',
      status: updateContact?.status || 'active',
      id: updateContact?.id
    }
  })
  const dispatch = useAppDispatch()

  const onSubmit = (data: any) => {
    console.log(data)
    dispatch(addOrUpdate(data))
    setUpdateContact(undefined)
    setIsCreating(false)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}
      className="w-full md:w-1/2 rounded-2xl bg-green-100 p-10 flex items-center"
    >
      <div className="flex flex-col gap-4 w-full">
        <label htmlFor="firstName" className="text-green-950 font-semibold text-xl">First Name</label>
        <input {...register('firstName')} type="text" name="firstName" id="firstName" className="rounded-xl p-2 bg-green-200" />
        <label htmlFor="lastName" className="text-green-950 font-semibold text-xl">Last Name</label>
        <input {...register('lastName')} type="text" name="lastName" id="lastName" className="rounded-xl p-2 bg-green-200" />
        <label htmlFor="status" className="text-green-950 font-semibold text-xl">Status</label>
        <select id="status" className="rounded-xl p-2 bg-green-200" {...register('status')}>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        <button
          type="submit"
          className="bg-green-500 text-white rounded-xl py-4 px-6 text-2xl hover:bg-green-700 transition-colors ease-in-out duration-200 mt-4"
        >
          {updateContact ? 'Update Contact' : 'Save Contact'}
        </button>
      </div>
    </form>
  )
}

export default Contacts;
