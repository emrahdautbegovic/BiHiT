class Category < ApplicationRecord
  validates :naziv, presence: true
end
