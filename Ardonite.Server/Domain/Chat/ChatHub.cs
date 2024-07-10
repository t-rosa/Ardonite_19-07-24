using Microsoft.AspNetCore.SignalR;

namespace Ardonite.Server.Domain.Chat;

public class ChatHub : Hub
{
    public async Task Message(string message)
    {
        await Clients.All.SendAsync("MessageReceived", message);
    }
}