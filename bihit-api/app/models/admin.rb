class Admin < ActiveRecord::Base
  # Include default devise modules.
  devise :database_authenticatable
  include DeviseTokenAuth::Concerns::User
end
