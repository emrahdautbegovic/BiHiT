require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module BihitApi
  class Application < Rails::Application


    config.action_dispatch.default_headers = {
      'Access-Control-Allow-Origin' => 'http://localhost:4200/',
      'Access-Control-Request-Method' => %w{GET POST OPTIONS}.join(",")
    }
    config.middleware.use "Rack::Cors" do

      allow do
        origins '*'
        resource '*',
          :headers => :any,
          :expose  => ['access-token', 'expiry', 'token-type', 'uid', 'client'],
          :methods => [:get, :post, :options, :delete, :put]
      end
      
    end
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    config.api_only = true
    # -- all .rb files in that directory are automatically loaded.
  end
end
