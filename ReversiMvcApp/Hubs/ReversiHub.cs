using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace ReversiMvcApp.Hubs
{
    public class ReversiHub : Hub
    {
        public async Task SendMessage(string user, string message) 
        {
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }
    }
}
