class Question < ApplicationRecord
  belongs_to :user
  validates :title, presence: true
  has_many :answers, :dependent => :delete_all
end
