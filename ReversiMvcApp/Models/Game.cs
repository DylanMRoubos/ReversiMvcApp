using System;
using Newtonsoft.Json;

namespace ReversiMvcApp.Models
{
    public class Game
    {
        public int ID { get; set; }
        public string Token { get; set; }
        public string PlayerToken1 { get; set; }
        public string PlayerToken2 { get; set; }
        public string Description { get; set; }
        public string Winner { get; set; }
        public bool Finished { get; set; }
        //public string[] Board { get; set; }
        public string CurrentPlayer { get; set; }

        public Game()
        {

        }

        public Game(string playertoken1, string description)
        {
            PlayerToken1 = playertoken1;
            Description = description;
        }
    }
}
