import { AppButton } from "@components/ui/shared/AppButton";
import { Switch } from "antd";
import { RubySmallIcon } from "src/icons";

export default function CreatePrivateChat() {
  return (
    <section>
      <h1 className="text-xl pb-4">Create private room</h1>
      <div className="flex flex-col lg:flex-row items-stretch justify-between gap-6 pb-6">
        <div className="bg-red-600 text-white p-4 rounded-lg w-full">
          <p className="text-xl pb-3 border-b border-white">Available for a private chat?</p>
          <article className="flex items-center justify-between pt-3">
            <p className="text-3xl font-semibold ">not available</p>
            <Switch />
          </article>
        </div>
        <div className="text-black p-4 rounded-lg w-full border">
          <p className="text-xl pb-3 border-b">Extend timer 2/mins</p>
          <article className="flex items-center justify-between pt-3">
            <p className="text-3xl">2:00</p>
          </article>
        </div>
        <div className="text-black p-4 rounded-lg w-full border">
          <p className="text-xl pb-3 border-b">My private chat fee</p>
          <article className="flex items-center justify-start pt-3">
            <p className="text-3xl">30</p>
            <img src='/static/gem.png' />
            <p className="text-3xl">/min</p>
          </article>
        </div>
      </div>
      <div className="p-4 rounded-lg border">
        <h2 className="text-xl pb-2 border-b">Fan is waiting for you to join. please begin stream.</h2>
        <form className="pt-6 grid grid-cols-3">
          <fieldset className="flex items-center gap-3 text-black p-2">
            <input style={{accentColor: '#000'}} className="w-6 h-6" type="radio" name="performer" value={'performerId'} />
            <div className="flex items-center gap-2">
              <img className="w-14 h-14 rounded-full" src='/static/no-avatar.png' />
              <div>
                <p className="text-lg">Alex Mills</p>
                <p>
                  <span>5</span>
                  <RubySmallIcon />
                  <span>/min</span>
                </p>
              </div>  
            </div>
          </fieldset>
        </form>
      </div>
      <div className="w-full flex flex-col justify-end items-end pt-4">
        <AppButton variant="tertiary" className="w-[260px] bg-gray-100 text-gray-300 border-0">
          Go live
        </AppButton>
        <AppButton className="bg-transparent text-gray-300 w-[260px] px-0">
          Community guidelines
        </AppButton>
      </div>
    </section>
  )
}

