using Microsoft.AspNetCore.SignalR;

namespace Ardonite.Server.Domain.Chat;

public class ChatHub : Hub
{
    public async Task NewMessage(long username, string message)
    {
        await Clients.All.SendAsync("messageReceived", username, message);
    }
}