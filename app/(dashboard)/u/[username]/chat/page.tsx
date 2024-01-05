import { getSelf } from "@/lib/auth-service";
import { getStreamByuserId } from "@/lib/stream-service";
import { ToggleCard } from "./_components/toggle-card";

const ChatPage = async () => {
    const self = await getSelf();
    const stream = await getStreamByuserId(self.id);

    if (!stream) {
        throw new Error("Stream not found");
    }
    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold">
                    Chat settings
                </h1>
            </div>
            <div className="space-y-4">
                <ToggleCard 
                    field="isChatEnabled"
                    label="Enable chat"
                    value={stream.isChatEnabled}
                />
                <ToggleCard 
                    field="isChatDelayed"
                    label="Delay chat"
                    value={stream.isChatDelayed}
                />
                <ToggleCard 
                    field="isChatFollowerOnly"
                    label="Must be following to chat"
                    value={stream.isChatFollowerOnly}
                />
            </div>
        </div>
    )
}

export default ChatPage;