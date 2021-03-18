using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Security.Claims;
using Newtonsoft.Json;
using ReversiMvcApp.DAL;
using ReversiMvcApp.Models;

namespace ReversiMvcApp.Data
{
    public class ReversiApiContext
    {
        private string _requestUri = "https://localhost:5001/";
        private HttpClient _client;
        private string _playerToken;        

        public ReversiApiContext(string playerToken)
        {
            HttpClientHandler clientHandler = new HttpClientHandler();
            clientHandler.ServerCertificateCustomValidationCallback = (sender, cert, chain, sslPolicyErrors) => { return true; };

            _client = new HttpClient(clientHandler);
            _client.BaseAddress = new Uri(_requestUri);
            _client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            _playerToken = playerToken;
        }

        public HttpResponseMessage GetRequest(string url)
        {
            return _client.GetAsync(url).Result;
        }

        public HttpResponseMessage PostRequest(string url, Object model)
        {
            return _client.PostAsJsonAsync(url, model).Result;
        }

        public HttpResponseMessage DeleteRequest(string url)
        {
            return _client.DeleteAsync(url).Result;
        }

        public bool PlayerHasActiveGame()
        {
            //GET current user ID
            string apiUri = "/api/spel/Speler/" + _playerToken;
            var response = GetRequest(apiUri);
            
            if (response.IsSuccessStatusCode)
            {
                if (!string.IsNullOrWhiteSpace(response.Content.ReadAsStringAsync().Result))
                {
                    return true;
                }
            }
            return false;
        }

        public string GetPlayerCurrentGame()
        {
            string apiUri = "/api/Spel/Speler/" + _playerToken;


            HttpResponseMessage response = GetRequest(apiUri);
            var responseBody = response.Content.ReadAsStringAsync();
            var responseGame = JsonConvert.DeserializeObject<Game>(responseBody.Result);

            if (response.IsSuccessStatusCode)
            {
                if (response.Content.ReadAsStringAsync().Result != null)
                {
                    return responseGame.Token;
                }
            }
            return null;
        }


    }
}
