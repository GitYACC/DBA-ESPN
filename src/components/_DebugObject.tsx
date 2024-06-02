export default function DebugObject(props: Record<string, any>) {
    return (
        <div className="p-4 rounded-lg bg-white border divide-y w-56">
            {Object.keys(props).map((key, index) => (
                <div key={index} className="flex justify-between text-sm text-gray-900 px-4 py-2">
                    <span>{key}</span>
                    {!(props[key] instanceof Object)
                        ? <span>{props[key]}</span>
                        : <span>{key} Object</span>
                    }
                </div>
            ))}
        </div>
    )
}