import { Button } from "@/components/ui/button";
import UrlCard from "./_components/url-card";
import { getSelf } from "@/lib/auth-service";
import { getStreamByuserId } from "@/lib/stream-service";
import { KeyCard } from "./_components/key-card";
import { ConnectModal } from "./_components/connect-modal";

const KeysPage = async () => {
    const self = await getSelf();
    const stream = await getStreamByuserId(self.id)
    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold">
                    Keys & URLs
                </h1>
                <ConnectModal />
            </div>
            <div className="space-y-4">
                <UrlCard value={stream?.serverUrl}/>
                <KeyCard value={stream?.streamKey || ""}/>
            </div>
        </div>
    )
}

export default KeysPage;