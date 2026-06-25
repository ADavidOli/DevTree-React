import type { DevTreeLink } from "../types"
import { Switch } from '@headlessui/react'
import { classNames } from "../utils/idex"

type DevTreeInputProps = {
    item: DevTreeLink
    handleUrlChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleEnabledLink: (socialNetwork: string) => void
}

const DevTreeInput = ({ item, handleUrlChange, handleEnabledLink }: DevTreeInputProps) => {
    return (
        <>
            <div className="bg-white shadow-sm rounded-lg p-4 flex items-center gap-3">
                <div
                    className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 bg-contain bg-center bg-no-repeat"
                    style={{ backgroundImage: `url('/social/icon_${item.name}.svg')` }}
                />

                <input
                    type="text"
                    className="flex-1 min-w-0 rounded-lg border border-gray-300 px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={item.url}
                    onChange={handleUrlChange}
                    name={item.name}
                />

                <div className="shrink-0">
                    <Switch
                        checked={item.enabled}
                        onChange={() => handleEnabledLink(item.name)}
                        className={classNames(
                            item.enabled ? 'bg-blue-500' : 'bg-gray-200',
                            'relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                        )}
                    >
                        <span
                            aria-hidden="true"
                            className={classNames(
                                item.enabled ? 'translate-x-5' : 'translate-x-0',
                                'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow transition duration-200 ease-in-out'
                            )}
                        />
                    </Switch>
                </div>
            </div>
        </>
    )
}

export default DevTreeInput